var selectedOption = 'X';
var nonSelectedOption = 'O';
var noOfRows = document.getElementById('rows');
var arrayOfMartixCells = [];
var arrayOfUsedMatrixCells = [];
var winFlag = 0 ;
var counter = 0;
var timer = 60;
var intervalId;
var matrixSize = parseInt(noOfRows.options[noOfRows.selectedIndex].text);
var myTable = document.querySelector('#matrix');
var playerName = "";
var player1Win = 0;
var player2Win = 0;
drawMatrix();
var profileInfo = 0;
var colourStorage;
var backgroundColour;
//var backgroundColourStorage;
if(profileInfo === 0) {
	document.getElementById('profile').style.display = "none";
}
if(localStorage.getItem('backgroundColourStorage') !== "") {
	var colour = localStorage.getItem('backgroundColourStorage');
	document.body.style.backgroundColor = colour;
}
else {
	document.body.style.backgroundColor = "black";	
}
document.getElementById('resetScore').addEventListener("click",function () {
	localStorage.setItem('backgroundColourStorage',"black");
	document.body.style.backgroundColor = localStorage.getItem('backgroundColourStorage');
	localStorage.setItem('player1WinStorage', 0);
	player1Win = localStorage.getItem(player1Win);
	localStorage.setItem('player2WinStorage', 0);
	player2Win = localStorage.getItem(player2Win);
	document.getElementById('p1Span').innerHTML = player1Win;
	document.getElementById('p2Span').innerHTML = player2Win;
	clearMatrix();
	drawMatrix();
	document.getElementById('resultSpan').innerHTML = "";
	document.getElementById('time').innerHTML = "";
});

if(winFlag !== 1) {
document.getElementById('click').addEventListener('click',function() {
//document.getElementById('matrix').style.pointerEvents = 'auto';
	intervalId = setInterval(function() { timer--; 
		if(timer === 0) {
			alert("Time Out");
			reload();
		}
		document.getElementById('time').innerHTML = timer + "seconds to make your move";
	}, 1000);
});
}
document.getElementById("profileBtn").addEventListener("click",function(){
	profileInfo = 1;
	document.getElementById('matrix').style.display = "none";
	document.getElementById('profile').style.display = "block";
	// document.getElementById('profile').style.textAlign = "center";
	document.getElementById('profile').style.position = "absolute";
	document.getElementById('profile').style.width = "1000px";
	document.getElementById('bottomBar').style.display = "none";
	clearMatrix();
	document.getElementById('submitBtn').addEventListener("click", function() {
		playerName = document.getElementById('name').value;	
		profileInfo = 0;
		backgroundColour = document.getElementById('bgColor').value;		
		document.getElementById('matrix').style.display = "block";
		document.getElementById('bottomBar').style.display = "block";
		document.getElementById('profile').style.display = "none";	
		drawMatrix();
		localStorage.setItem('backgroundColourStorage', backgroundColour );
		document.body.style.backgroundColor = backgroundColour;
	});

	
});

function reload() {
	location.reload();
}
function checkBtn(event) {
	selectedOption = event.target.id;
	console.log(selectedOption);
}

function chooseMatrixSize() {
winFlag = 0;
matrixSize = parseInt(noOfRows.options[noOfRows.selectedIndex].text);
clearMatrix();
drawMatrix();
//do 
}

function clearMatrix() {
	newTable.remove();
	arrayOfMartixCells = [];
	document.getElementById('resultSpan').innerHTML = "";
}

function drawMatrix() {
	if(playerName === "") {
		document.getElementById('profileInfo').innerHTML = "Hello! Guest";
	}
	else {
		document.getElementById('profileInfo').innerHTML = "Hello! " + playerName;
	}
	
	var myTable = document.querySelector('#matrix');
	console.log(myTable);
	var table = document.createElement('TABLE');
	// table.style.border = "1px solid white";

	var tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);
	table.id = "newTable";
	table.style.border = "2px solid white";
	table.style.borderRadius = "20px";
	table.style.padding = "5px";
	for(var i=0; i<matrixSize; i++) {
		var tr = document.createElement('TR');
		tableBody.appendChild(tr);

		tr.style.border = "1px solid white";
		for(var j = 0; j<matrixSize; j++) {
			var td = document.createElement('TD');
			td.id = ""+i+j;
			var id = td.id;
			arrayOfMartixCells.push(td);
			td.style.border = "1px solid white";
			td.style.borderRadius = "20px";
			td.width = "100px";
			td.height = "100px";
			tr.appendChild(td);
			td.style.fontSize = "25px";
		}
	}
	myTable.appendChild(table);
	document.getElementById('playerTurn').innerHTML = "";
	player1Win = localStorage.getItem('player1WinStorage');
	player2Win = localStorage.getItem('player2WinStorage');
	document.getElementById('p1Span').innerHTML = player1Win;
	document.getElementById('p2Span').innerHTML = player2Win;
}

var dropdown = document.getElementById('players');
var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;

function choosePlayers() {
	winFlag = 0;
	
	var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;
	for(var i=0; i<arrayOfMartixCells.length; i++){
		arrayOfMartixCells[i].innerHTML = "";
		arrayOfMartixCells[i].style.backgroundColor = "black";
	}
	document.getElementById('resultSpan').innerHTML = "";
	console.log("choosePlayers "+noOfPlayers);
}


var playerMove1 = function(event){
if((event.target.tagName === 'TD') && (event.target.innerHTML === "")) {
	console.log(event.target.innerHTML)
var usedCellId  = event.target ;
var p = document.createElement('P');
p.textContent = selectedOption;
usedCellId.appendChild(p);
usedCellId.style.backgroundColor = "tomato";
event.target.style.textAlign = "center";
var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;
checkWinPlayer();
if(winFlag === 1) {
	clearInterval(intervalId); 
	document.getElementById('matrix').style.pointerEvents = 'none';
	document.getElementById('playerTurn').innerHTML = "";
	document.getElementById('time').innerHTML = "";
	player1Win = localStorage.getItem('player1WinStorage');
	document.getElementById('p1Span').innerHTML = player1Win;
}
else {
	checkTie();
	if(winFlag === 1) {
	clearInterval(intervalId); 
	document.getElementById('matrix').style.pointerEvents = 'none';
	document.getElementById('playerTurn').innerHTML = "";
	document.getElementById('time').innerHTML = "";
	player2Win = localStorage.getItem('player1WinStorage');
	document.getElementById('p1Span').innerHTML = player1Win;

}
	if(noOfPlayers === "1") {
		timer = 10;
		document.getElementById('playerTurn').innerHTML = "waiting... for computer";
		document.getElementById('matrix').style.pointerEvents = 'none';
		setTimeout(function() { compMove(); }, 2000);
		
	}
	else
	{
		timer = 10;
		document.getElementById('playerTurn').innerHTML = "waiting... for Player 2";
		console.log("2 players");
	}
}

console.log(event);
} 
counter ++;
timer = 10;
}

function move() {
	noOfPlayers = dropdown.options[dropdown.selectedIndex].value;
	if(noOfPlayers === "1") {
		playerMove1(event);

	}
	else if(noOfPlayers === "2") {
		if(counter === 0) {
		playerMove1(event);}
		else if(counter === 1) {
		playerMove2(event);
		if(winFlag !== 1) {		
		document.getElementById("resultSpan").innerHTML = "";}
	}
	}
}

function checkWinPlayer() {
	if(matrixSize === 3) {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent !== "") {
			
				if( arrayOfMartixCells[1].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}
				else if(arrayOfMartixCells[1].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}
				else if(arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					return true;
				}
			//finish row

		}
	}
	}

	if(matrixSize === 4){
		for(var i=0; i<arrayOfMartixCells.length; i++) {
			if(arrayOfMartixCells[i].textContent !== "") {
				if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption && arrayOfMartixCells[1].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[15].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[13].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[1].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[14].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption && arrayOfMartixCells[11].textContent === selectedOption && arrayOfMartixCells[15].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[11].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === selectedOption && arrayOfMartixCells[13].textContent === selectedOption && arrayOfMartixCells[14].textContent === selectedOption && arrayOfMartixCells[15].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[12].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}

			}
		}
	}
}


function checkWinComp() {
	if(matrixSize === 3) {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent !== "") {
			console.log(arrayOfMartixCells[1].textContent);
			
				if( arrayOfMartixCells[1].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}

				else if(arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}
				else if(arrayOfMartixCells[1].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}
				else if(arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					return true;
				}
			//finish row

		}
	}
	}
	if(matrixSize === 4){
		for(var i=0; i<arrayOfMartixCells.length; i++) {
			if(arrayOfMartixCells[i].textContent !== "") {
				if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption && arrayOfMartixCells[1].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[15].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[13].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[1].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[14].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption && arrayOfMartixCells[11].textContent === nonSelectedOption && arrayOfMartixCells[15].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[11].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === nonSelectedOption && arrayOfMartixCells[13].textContent === nonSelectedOption && arrayOfMartixCells[14].textContent === nonSelectedOption && arrayOfMartixCells[15].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[12].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}

			}
		}
	}
}

function playerMove2(event) {
	if(selectedOption === "O"){
	nonSelectedOption = "X";
}
	if((event.target.tagName === 'TD') && (event.target.innerHTML === "")) {
		var usedCellId  = event.target ;
		var p = document.createElement('P');
		p.textContent = nonSelectedOption;
		usedCellId.appendChild(p);
		usedCellId.style.backgroundColor = "tomato";
		event.target.style.textAlign = "center";
		counter --;
		checkWinComp();
		checkTie();
		if(winFlag === 1) { 
			document.getElementById('matrix').style.pointerEvents = 'none';
			document.getElementById('playerTurn').innerHTML = "";
			clearInterval(intervalId);

			document.getElementById('time').innerHTML = "";
			player2Win = localStorage.getItem('player2WinStorage');
			document.getElementById('p2Span').innerHTML = player2Win;
		}
		else {
			document.getElementById('playerTurn').innerHTML = "waiting... for Player 1";
		}
		console.log("out "+ document.getElementById('resultSpan').innerHTML);
	}
	timer = 10;
}

function compMove() {
if(selectedOption === "O"){
	nonSelectedOption = "X";
}
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		var chooseCell = Math.floor(Math.random() * arrayOfMartixCells.length);
		if((arrayOfMartixCells[chooseCell].style.backgroundColor !== "tomato") && (arrayOfMartixCells[chooseCell].innerHTML === ""))
		{
			var p = document.createElement('P');
			p.textContent = nonSelectedOption;
			arrayOfMartixCells[chooseCell].appendChild(p);
			arrayOfMartixCells[chooseCell].style.backgroundColor = "tomato";
			arrayOfMartixCells[chooseCell].style.textAlign = "center";
			checkWinComp();
			checkTie();
			if(winFlag === 1) {
				document.getElementById('matrix').style.pointerEvents = 'none';
				document.getElementById('playerTurn').innerHTML = "";
				document.getElementById('time').innerHTML = "";
				player2Win = localStorage.getItem('player2WinStorage');
				document.getElementById('p2Span').innerHTML = player2Win;
				clearInterval(intervalId);
			}
			else {
				document.getElementById('playerTurn').innerHTML = "waiting... for Player 1";
			}
			break;
		}
	}
	document.getElementById('matrix').style.pointerEvents = 'auto';
	timer = 10;
}
if(counter === 1){
		document.getElementById("resultSpan").innerHTML = "waiting... for player 2 move"
		console.log(resultSpan.innerHTML);
	}
document.getElementById("matrix").addEventListener("click",move);




function checkTie() {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent === "") {
			return;
		}
	}
		document.getElementById('resultSpan').innerHTML = "Tie";
		winFlag = 1;
		return true;	
}
