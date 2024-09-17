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
	  return y - (Characters.a*-((this.counter)**2) -0.252*-(this.counter));
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
		leftHTMLCharacters[i].style.left = Math.floor(x1*0.3 + 3) + "%";		// left characters on the left 1/3 of the screen with slight move to the right
		leftHTMLCharacters[i].style.top = y1 + "%";
		leftContainer.appendChild(leftHTMLCharacters[i]);
		
		[x2, y2, c2] = rightCharacters.charArray[i];
		rightHTMLCharacters.push(document.createElement("div"));
		rightHTMLCharacters[i].setAttribute('class', 'floatingCharacter');
		rightHTMLCharacters[i].innerHTML = c2;
		rightHTMLCharacters[i].style.left = Math.floor(x2*0.3 + 67) + "%";		// right characters on the right 1/3 of the screen with slight move to the left
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
			leftHTMLCharacters[i].style.top = y1;
			
			[, y2, ] = rightCharacters.charArray[i];
			rightHTMLCharacters[i].style.top = y2;
		}
		clearInterval(floatID);
	}
}