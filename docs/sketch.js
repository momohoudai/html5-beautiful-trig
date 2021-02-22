
var geSpeed;
var geLines;
var geShowTrick = false;

var slSpeed, slLines;
var btShowTrick;

// internal globals
var giOuterCirclePos;
var giAnglePerLine; 
var giTimeElapsed = 0.0;
var giDiameter = 100.0;
var giBallDiameter = 50.0;
var giOuterBallDiameter = 25.0;


function setup() {
	giOuterCirclePos = createVector(0,0);
	
	
	// create sliders
	slSpeed = createSlider(1, 30, 10);
	slSpeed.position(20, 20);
	slLines = createSlider(0, 50, 20);
	slLines.position(20, 60);

	btShowTrick = createButton('Toggle Show Lines');
	btShowTrick.position(50, 100);
	btShowTrick.mousePressed(ShowLinesEvent);
  
	windowResized();
}

function windowResized() {
	resizeCanvas(windowWidth * 0.99, windowHeight * 0.98);
	giDiameter = windowWidth * 0.4;
	giBallDiameter = windowWidth * 0.025;
}

// normalized 'to'
function project(from, to) {
	let ret = to.copy();
	return ret.mult(from.dot(to)); 
}

//https://www.rapidtables.com/convert/color/rgb-to-hsv.html

function ShowLinesEvent() {
	geShowTrick = !geShowTrick;

}

function draw() {
	geSpeed = slSpeed.value()
	geLines = slLines.value()
	
	
	background(123,97,67);
	giAnglePerLine = PI / geLines;
	giTimeElapsed += deltaTime * geSpeed * 0.0001;
	
	textSize(18);
	text('speed', slSpeed.x * 2 + slSpeed.width - 15, 25);
	text('circles', slLines.x * 2 + slLines.width - 15, 70);
	
	
	
	// update the outer circle
	giOuterCirclePos.set(
		cos(giTimeElapsed) * giDiameter/2,
		sin(giTimeElapsed) * giDiameter/2
	);
	
	
	push();
	translate(windowWidth * 0.5, windowHeight * 0.5) // center of screen
	
	// lines
	if ( geShowTrick ) {
		for (let i = 0; i < geLines; ++i ) {
			let vec = createVector(1,0).rotate(giAnglePerLine * i);
			let min = vec.copy().mult(-giDiameter/2);
			let max = vec.copy().mult(giDiameter/2);
			line(min.x, min.y, max.x, max.y);
		}
		
		// outer circle line
		push();
		noFill();
		circle(0, 0, giDiameter);
		pop();
			
	}
	
	colorMode(HSB, 100);
	for (let i = 0; i < geLines; ++i ) {
		let vec = createVector(1,0).rotate(giAnglePerLine * i)
		let posVec = project(giOuterCirclePos, vec);
		let h = ceil(100/geLines * i);

		fill(h, 75, 100);
		circle(posVec.x, posVec.y, giBallDiameter);
	}
	colorMode(RGB, 255);
	
	
	
	// outer circle
	if ( geShowTrick ) {	
		fill(255, 255, 255);
		circle(giOuterCirclePos.x, giOuterCirclePos.y, giOuterBallDiameter);
	}
	
	pop();
}



















