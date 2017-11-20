var squares = document.querySelectorAll(".square");
var msgDisplay = document.querySelector(".msg");
var h1 = document.querySelector("h1");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var colorDisplay = document.querySelector(".rgb");
var resetBtn = document.querySelector("#reset");
var modButtons = document.querySelectorAll(".mode");

var gameMode = 6;

//polje generiranih barv
var colors = generateRandColors(6);

//barva ki jo iscemo
var pickedColor = pickColor();
//prikaz izbrane barve

init();

function init(){
	setupModeButtons();
	//izris barv v html
	setupSquares();
	reset();
}

function setupSquares(){
	squares.forEach(function(el, i, arr){
		el.addEventListener("click",function(){
			var col = this.style.backgroundColor;

			if(col === pickedColor){
				msgDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetBtn.textContent = "Play again!";
			}
			else{
				this.style.backgroundColor = "#232323";
				msgDisplay.textContent = "Try again!";
			}
		});
	});
}

function setupModeButtons(){
	modButtons.forEach(function(e){
		e.addEventListener("click",function(){
			modButtons[0].classList.remove("selected");
			modButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				gameMode = 3;
			}else{
				gameMode = 6;
			}
			reset();
		});
	});
}

function reset(){
	colors = generateRandColors(gameMode);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetBtn.textContent = "New Colour";
	msgDisplay.textContent = "";
	squares.forEach(function(el,i){
		if(colors[i]){//če so barve na voljo drugače ostale izbrise
			el.classList.remove("hide");
			el.style.backgroundColor = colors[i];
		}
		else{
			el.classList.add("hide");
		}
	});
	h1.style.backgroundColor = "steelblue";
}

/*	gameMode = 3;
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	colors = generateRandColors(gameMode);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	squares.forEach(function(el,i){
		if(i > 2){
			el.classList.add("hide");
		}else{
			el.style.backgroundColor = colors[i];
		}
	});

});

hardBtn.addEventListener("click",function(){
	gameMode = 6;
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	colors = generateRandColors(gameMode);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	squares.forEach(function(el, i){
		el.classList.remove("hide");
		el.style.backgroundColor = colors[i];
	});
});
*/

resetBtn.addEventListener("click", function(){
	reset();
});

//spremeni vse kvadratke v eno barvo
function changeColors(color){
	squares.forEach(function(el,i){
		el.style.backgroundColor = color;
	});
}

//izbere eno barvo iz polja generiranih barv
function pickColor(){
	var num = Math.floor(Math.random()*colors.length);
	return colors[num];
}

//generira polje barv
function generateRandColors(num){
	var colors = [];
	for(var i = 0; i < num; i++){
		colors.unshift(randomColor());
	}
	return colors;
}

//ustvari naključno barvo
function randomColor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var  blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}