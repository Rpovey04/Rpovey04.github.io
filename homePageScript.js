let movesToMake = 120;
var floatID = null;
var snakeID = null;
			
const leftChars = [];
const leftInitialHeights = [];
const rightChars = [];
const rightInitialHeights = [];
		
var step = 0;
let a = 320/101757;
const displayCharacters = [";", "&", "/", "*", "(", ")"];
		
let numChars = 20;	// usually 10
		
function startFunction() {	// main
	var leftContainer = document.getElementById("leftContainer");
	var rightContainer = document.getElementById("rightContainer");
				
	// Creating 'pixel' elements here
	var xoffset = 10;		// both % based
	var yoffset = 10;
	for (let i = 0; i < numChars; i++) {
		leftChars.push(document.createElement("div"));
		leftChars[i].setAttribute('class', 'floatingCharacter');
		leftChars[i].innerHTML = displayCharacters[Math.floor(Math.random() * 6)];
		leftInitialHeights.push(Math.floor(((yoffset + Math.abs((Math.random() * 20) - 10)) % 70) + 15));
		leftChars[i].style.left = Math.floor((xoffset + Math.abs((Math.random() * 20) - 10)) % 100) + "%";
		leftChars[i].style.top = (leftInitialHeights[i]) + "%";
		leftContainer.appendChild(leftChars[i]);
					
		rightChars.push(document.createElement("div"));
		rightChars[i].setAttribute('class', 'floatingCharacter');
		rightChars[i].innerHTML = displayCharacters[Math.floor(Math.random() * 6)];
		rightInitialHeights.push(Math.floor(((yoffset + Math.abs((Math.random() * 20) - 10)) % 70) + 15));
		rightChars[i].style.left = Math.floor((xoffset + Math.abs((Math.random() * 20) - 10)) % 100) + "%";
		rightChars[i].style.top = (rightInitialHeights[i]) + "%";
		rightContainer.appendChild(rightChars[i]);
					
		xoffset = (xoffset + (Math.random() * 30)) % 100;
		yoffset = (yoffset + (Math.random() * 30)) % 100;
	}
				
	floatID = setInterval(animateCharacters, 25);	// approx 45 FPS
}
		
function animateCharacters() {		// floating characters at load 
	if (movesToMake > 0) {
		movesToMake -= 1;
		step = a*-((movesToMake)**2) -0.252*-(movesToMake); 
		for(let i = 0; i < numChars; i++) {
			leftChars[i].style.top = (leftInitialHeights[i]-step) + "%";
			rightChars[i].style.top = (rightInitialHeights[i]-step) + "%";
		}
	}
	else if (movesToMake == 0) {	// end of float in
		movesToMake -= 1;
		for(let i = 0; i < numChars; i++) {
			// rounds numbers to avoid floating point inaccuracy
			leftChars[i].style.top = Math.ceil(Number(leftChars[i].style.top.slice(0, -1))) + "%";
			rightChars[i].style.top = Math.ceil(Number(rightChars[i].style.top.slice(0, -1))) + "%";	
			// leftChars[i].innerHTML = "(" + leftChars[i].style.left + "," + leftChars[i].style.top + ")";
		}
					
		//starting snake game / ending animation
		clearInterval(floatID);
		snakeID = setInterval(playSnake, 100);		// 30 FPS
	}
}
		
//---SNAKE---
		
let count = 0;
let head = null;
let tmpHold = null;
let detected = 0;
let addOnNextTurn = 0;
let dead = 1;		// initially dead
let direction = [];		// can be [1, 0], [-1, 0], [0, 1], [0, -1]
let snakeBody = [];		// array of body coordinates
let snakeBodyHTML = [];
let choice = null;
		
function initSnake() {
	for (let i = 0; i < snakeBodyHTML.length; i++) {snakeBodyHTML[i].remove();}
	
	snakeBodyHTML = [];
	snakeBody = [];
	direction = [0, 1];		// always starts north
	let initialX = Math.floor(Math.random() * 80) + 10; 
	let initialY = Math.floor(Math.random() * 80) + 10;
			
	snakeBody.push([initialX, initialY]);
	snakeBodyHTML.push(document.createElement("div"));
	snakeBodyHTML[0].setAttribute('class', 'snakeBody');
	snakeBodyHTML[0].style.left = snakeBody[0][0] + "%";
	snakeBodyHTML[0].style.top = snakeBody[0][1] + "%";
	leftContainer.appendChild(snakeBodyHTML[0]);
			
	snakeBody.push([initialX, initialY+1]);
	snakeBodyHTML.push(document.createElement("div"));
	snakeBodyHTML[1].setAttribute('class', 'snakeBody');
	snakeBodyHTML[1].style.left = snakeBody[1][0] + "%";
	snakeBodyHTML[1].style.top = snakeBody[1][1] + "%";
	leftContainer.appendChild(snakeBodyHTML[1]);
			
	snakeBodyHTML[0].innerHTML = "*";
	snakeBodyHTML[1].innerHTML = "*";
	dead = 0;
			
}

function moveSnake() {
	snakeBody.unshift([snakeBody[0][0] + direction[0], snakeBody[0][1] + direction[1]]);
	
	if (addOnNextTurn == 0) {
		snakeBody.pop();
		tmpHold = snakeBodyHTML.pop();
	}
	else {
		tmpHold = document.createElement("div");
		tmpHold.setAttribute('class', 'snakeBody');
		leftContainer.appendChild(tmpHold);
		addOnNextTurn = 0;
	}
			
	tmpHold.style.left = snakeBody[0][0] + "%";
	tmpHold.style.top = snakeBody[0][1] + "%";
	tmpHold.innerHTML = "+";
	snakeBodyHTML.unshift(tmpHold);
			
	// ASCII effect on body parts
	if (snakeBody[0][0] == snakeBody[1][0]) {
		if (snakeBody[0][1] > snakeBody[1][1]) {snakeBodyHTML[1].innerHTML = "&#x2193";}
		else {snakeBodyHTML[1].innerHTML = "^";}
	}
	else {
		if (snakeBody[0][0] > snakeBody[1][0]) {snakeBodyHTML[1].innerHTML = ">";}
		else {snakeBodyHTML[1].innerHTML = "<";}
	}
}
		
function checkAte() {
	detected = 0;
	for (let i = 0; i < leftChars.length && detected == 0; i++) {
		if (snakeBody[0][0] == Number(leftChars[i].style.left.slice(0, -1)) && snakeBody[0][1] == Number(leftChars[i].style.top.slice(0, -1))){
			leftChars[i].style.left = (Math.floor(Math.random() * 80) + 10) + "%";
			leftChars[i].style.top = (Math.floor(Math.random() * 80) + 10) + "%";
			leftChars[i].innerHTML = displayCharacters[Math.floor(Math.random() * 6)];
			addOnNextTurn = 1;
			detected = 1;
		}
	}
}

function checkDead() {
	if (snakeBody[0][0] <= 0 || snakeBody[0][0] >= 100 || snakeBody[0][1] >= 100 || snakeBody[0][1] <= 0) {dead = 1;}
	
	detected = 0;
	for (let i = 1; i < snakeBody.length && detected == 0; i++) {
		if (snakeBody[0][0] ==  snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
			dead = 1;
			detected = 1;
		}
	}
}

function makeMove() {		// random for now, will eventually use forward prop on pretrained weights
	choice = Math.floor(Math.random() * 3);
	if (direction[0] == 1 && direction[1] == 0) {
		direction = [[1, 0], [0, 1], [0, -1]][choice];
		return;
	}
	if (direction[0] == -1 && direction[1] == 0) {
		direction = [[-1, 0], [0, 1], [0, -1]][choice];
		return;
	}
	if (direction[0] == 0 && direction[1] == 1) {
		direction = [[-1, 0], [1, 0], [0, 1]][choice];
		return;
	}
	if (direction[0] == 0 && direction[1] == -1){
		direction = [[-1, 0], [1, 0], [0, -1]][choice];
		return;
	}
}
	
function playSnake() {			// snake main loop
	count += 1;
	if (dead == 1) {initSnake();}

	moveSnake();
	checkAte();
	checkDead();
	
	makeMove();		// comment out for control
}
		
/* temporary controls
document.addEventListener("keydown", (event) => {
	if (event.key == 'w') {
		if (!(direction[0] == 0 && direction[1] == 1)) {direction = [0, -1];}
	}
	else if (event.key == 'a') {
		if (direction != [1, 0]) {direction = [-1, 0];}
	}
	else if (event.key == 's') {
		if (direction != [0, -1]) {direction = [0, 1];}
	}
	else if (event.key == 'd') {
		if (direction != [-1, 0]) {direction = [1, 0];}
	}
});
*/