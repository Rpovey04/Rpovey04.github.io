const displayCharacters = [';', '&', '/', '*', '(', ')'];

class Characters {
  populateCharArray() {
    var xoffset = 10;
    var yoffset = 10;
    for (let i = 0; i < this.numChars; i++) {
      this.charArray.push([
        Math.floor(xoffset + Math.abs((Math.random() * 20) - 10)) % 100,
        Math.floor(((yoffset + Math.abs((Math.random() * 20) - 10)) % 70) + 5),
        displayCharacters[Math.floor(Math.random() * 6)]]);
      xoffset = (xoffset + (Math.random() * 30)) % 100;
	  yoffset = (yoffset + (Math.random() * 30)) % 100;
    }
  }
  
  static a = 320/101757;	// magic number
  nextAnimatedHeight(i) { 
	  let y = this.charArray[i][1];
	  return y - (Characters.a*-((120-this.counter)**2) -0.252*-(120-this.counter));
  }
  
  constructor(n) {
	this.counter = 0;
    this.numChars = n;
    this.charArray = [];
    this.populateCharArray();
  }
}


const numberOfCharacters = 20;
const leftHTMLCharacters = [];
const rightHTMLCharacters = [];

var leftCharacters;
var rightCharacters;


var floatID = null;
var snakeID = null;

function translateToLeft(x) { // left characters on the left 1/3 of the screen with slight move to the right
	return x*0.3 + 3
}
 
function translateToRight(x) { // right characters on the right 1/3 of the screen with slight move to the left
	return x*0.3 + 67
}

function startFunction() {	// main
	var leftContainer = document.getElementById("leftContainer");
	var rightContainer = document.getElementById("rightContainer");
	
	leftCharacters = new Characters(numberOfCharacters);
	rightCharacters = new Characters(numberOfCharacters);
	for (let i = 0; i < numberOfCharacters; i++) {
		[x1, y1, c1] = leftCharacters.charArray[i];
		leftHTMLCharacters.push(document.createElement("div"));
		leftHTMLCharacters[i].setAttribute('class', 'floatingCharacter');
		leftHTMLCharacters[i].innerHTML = c1;
		leftHTMLCharacters[i].style.left = translateToLeft(x1) + "%";		
		leftHTMLCharacters[i].style.top = y1 + "%";
		leftContainer.appendChild(leftHTMLCharacters[i]);
		
		[x2, y2, c2] = rightCharacters.charArray[i];
		rightHTMLCharacters.push(document.createElement("div"));
		rightHTMLCharacters[i].setAttribute('class', 'floatingCharacter');
		rightHTMLCharacters[i].innerHTML = c2;
		rightHTMLCharacters[i].style.left = translateToRight(x2) + "%";		
		rightHTMLCharacters[i].style.top = y2 + "%";
		rightContainer.appendChild(rightHTMLCharacters[i]);
		
	}
	
	floatID = setInterval(animateCharacters, 25);		// around 45 FPS
}

function animateCharacters() {
	if (leftCharacters.counter < 120 || rightCharacters.counter < 120) {
		//alert(leftCharacters.counter + ", " + rightCharacters.counter)
		leftCharacters.counter+=1;	rightCharacters.counter+=1;
		for (let i = 0; i < numberOfCharacters; i++) {
			leftHTMLCharacters[i].style.top = leftCharacters.nextAnimatedHeight(i) + "%";
			rightHTMLCharacters[i].style.top = rightCharacters.nextAnimatedHeight(i) + "%";
		}
	}
	// end of animation
	else {
		for (let i = 0; i < numberOfCharacters; i++) {
			[, y1, ] = leftCharacters.charArray[i];
			leftHTMLCharacters[i].style.top = y1 + "%";
			//leftHTMLCharacters[i].innerHTML = "(" + leftCharacters.charArray[i][0] + ", " +  y1+ ")";
			
			[, y2, ] = rightCharacters.charArray[i];
			rightHTMLCharacters[i].style.top = y2 + "%";
		}
		clearInterval(floatID);
		snakeID = setInterval(snakeMain, 200);		// 5 FPS
	}
}

//SNAKE
var snakeBody = [];
var snakeHTML = [];
var direction = [0, -1];
var died = 1;
var snakeAte = 0;
var leftBorder = 101;
var rightBorder = -1;
var topBorder = 101;
var bottomBorder = -1;

function findBorders() {
	for (let i = 0; i < numberOfCharacters; i++) {
		[x, y, c] = leftCharacters.charArray[i];
		if (x < leftBorder) {leftBorder = x;}
		if (x > rightBorder) {rightBorder = x;}
		if (y < topBorder) {topBorder = y;}
		if (y > bottomBorder) {bottomBorder = y;}
	}
}

function initSnake(){
	if (leftBorder == -1 || rightBorder == 101 || topBorder == 101 || bottomBorder == -1) {findBorders();}
	
	if (died){
		for (let i = 0; i < snakeHTML.length; i++) {snakeHTML[i].remove();}
		snakeBody = [];
		snakeHTML = [];
		died = 0;
	}
	
	
	let initialPos = [Math.floor(leftBorder + (Math.random() * (rightBorder-leftBorder))), Math.floor(topBorder + (Math.random() * (bottomBorder-topBorder)))];		// first for head of the snake
	direction = [0, -1];

	snakeBody.push(initialPos);
	snakeBody.push([initialPos[0] + direction[0], initialPos[1] + direction[1]]);
	
	for (let i = 0; i < snakeBody.length; i++) {
		[x, y] = snakeBody[i];
		snakeHTML.push(document.createElement("div"));
		snakeHTML[i].setAttribute('class', 'snakeBody');
		snakeHTML[i].style.left = translateToLeft(x) + "%";
		snakeHTML[i].style.top = y + "%";
		snakeHTML[i].innerHTML = '*';
		leftContainer.appendChild(snakeHTML[i]);
	}
}

function moveSnake() {
	snakeBody.unshift([snakeBody[0][0] + direction[0], snakeBody[0][1] + direction[1]]);
	let tmp = null;
	if (snakeAte == 1) {
		tmp = document.createElement("div");
		tmp.innerHTML = '*';
		tmp.setAttribute('class', 'snakeBody');
		leftContainer.appendChild(tmp);
		snakeAte = 0;
	}
	else {
		snakeBody.pop();
		tmp = snakeHTML.pop();
	}
	tmp.style.left = translateToLeft(snakeBody[0][0]) + "%";
	tmp.style.top = snakeBody[0][1] + "%";
	//tmp.innerHTML = "(" + snakeBody[0][0] + ", " + snakeBody[0][1] + ")";
	
	snakeHTML.unshift(tmp);
}

function changeSnakeDirection() {
	[x, y] = direction;
	choice = Math.floor(Math.random()*2);
	if (x == 0) {direction = [[1, 0], [-1, 0]][choice];}
	else {direction = [[0, 1], [0, -1]][choice];}
	
	/*		Uncomment for manual controls
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
}

function checkSnakeDead() {
	[x, y] = snakeBody[0];
	// bounds
	if (x < leftBorder || x > rightBorder || y < topBorder || y > bottomBorder) {return 1;}
	
	// touching body
	for (let i = 1; i < snakeBody.length-1; i++) {
		if (x == snakeBody[i][0] && y == snakeBody[i][1]) {return 1;}
	}
	
	return 0;
}

function checkSnakeAte() {
	for (let i = 0; i < numberOfCharacters; i++) {
		[x, y, c] = leftCharacters.charArray[i];
		if (x == snakeBody[0][0] && y == snakeBody[0][1]) {
			leftCharacters.charArray[i] = [Math.floor(leftBorder + (Math.random() * (rightBorder-leftBorder))), Math.floor(topBorder + (Math.random() * (bottomBorder-topBorder))), c];
			leftHTMLCharacters[i].style.left = translateToLeft(leftCharacters.charArray[i][0]) + "%";
			leftHTMLCharacters[i].style.top = leftCharacters.charArray[i][1] + "%";
			return 1;
		}
	}
	return 0;
}

// main snake function
function snakeMain() {
	if (died) {initSnake();}
	
	// weird algorithm for moving the snake
	if (Math.floor(Math.random() * 3) == 1) {changeSnakeDirection();}
	moveSnake();
	
	// checking status
	died = checkSnakeDead();
	snakeAte = checkSnakeAte();
}