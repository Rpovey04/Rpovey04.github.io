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
		leftInitialHeights.push(Math.floor(((yoffset + Math.abs((Math.random() * 20) - 10)) % 70) + 5));
		leftChars[i].style.left = Math.floor((xoffset + Math.abs((Math.random() * 20) - 10)) % 100) + "%";
		leftChars[i].style.top = (leftInitialHeights[i]) + "%";
		leftContainer.appendChild(leftChars[i]);
					
		rightChars.push(document.createElement("div"));
		rightChars[i].setAttribute('class', 'floatingCharacter');
		rightChars[i].innerHTML = displayCharacters[Math.floor(Math.random() * 6)];
		rightInitialHeights.push(Math.floor(((yoffset + Math.abs((Math.random() * 20) - 10)) % 70) + 5));
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
			leftChars[i].innerHTML = Math.ceil(Number(leftChars[i].style.left.slice(0, -1))) + ", " + Math.ceil(Number(leftChars[i].style.top.slice(0, -1))) ;
			rightChars[i].style.top = Math.ceil(Number(rightChars[i].style.top.slice(0, -1))) + "%";	
		}
					
		//starting snake game / ending animation
		clearInterval(floatID);
		snakeID = setInterval(playSnake, 100);		// 30 FPS
	}
}
		
// SNAKE 2

let snakeHTML = [];		// HTML elements
let snakeBody = [];		// logical positions
let dead = 1;
let leftBorder = 100;
let rightBorder = 0;
let topBorder = 100;
let bottomBorder = 0;
let firstInit = 0;

function initSnake() {
	if (firstInit == 0){
		for (let i = 0; i < numChars; i++) {
			let t = Number(leftChars[i].style.top.slice(0, -1));
			let l = Number(leftChars[i].style.left.slice(0, -1));
			if (l < leftBorder) {leftBorder = l;}
			if (l > rightBorder) {rightBorder = l;}
			if (t < topBorder) {topBorder = t;}
			if (t > bottomBorder) {bottomBorder = t;}
		}
	}
	
	for (let i = 0; i < snakeHTML.length; i++) {snakeHTML[i].remove();}
	
	snakeHTML = [];
	
	snakeHTML.push(document.createElement("div"));		// head
	snakeHTML[0].setAttribute('class', 'snakeBody');
	snakeHTML[0].innerHTML = leftBorder + ", " + topBorder ;
	snakeHTML[0].style.left = leftBorder + "%";
	snakeHTML[0].style.top = topBorder + "%";
	leftContainer.appendChild(snakeHTML[0]);
	
	snakeHTML.push(document.createElement("div"));		// first body segment
	snakeHTML[1].setAttribute('class', 'snakeBody');
	snakeHTML[1].innerHTML = rightBorder + ", " + bottomBorder;
	snakeHTML[1].style.left = rightBorder + "%";
	snakeHTML[1].style.top = bottomBorder + "%";
	leftContainer.appendChild(snakeHTML[1]);
	
	dead = 0;
	firstInit = 1;
}

function moveSnake() {
	
}

function checkAte() {
	
}

function checkDead() {
	
}

function makeMove() {
	
}

function playSnake() {			// snake main loop
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