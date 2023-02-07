
let song, buttton, fft;
let spectrum;
let rate = 1;
let oldmouseX, oldmouseY;
let theta = 0;
let length = 1024;
let vib = 2;

function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
	button.html('Play');
  } else {
    song.play();
	button.html('Pause');
  }
}

function preload() {
  song = loadSound('Ice & Fire - King Canyon.mp3'); 
}

function setup() {
  createCanvas(1000, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES); // Change the mode to DEGREES
  button = createButton('Pause');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 2048);
}

function draw() {
  background(0);
  song.rate(rate);
  translate(width/2, height/2);
  noFill();
  //stroke(color('red'));
  spectrum = fft.analyze();
  //length = 1024;
  radius = 100;
  rotate(theta);
  //console.log(spectrum, spectrum.length);
  for (let i = 0; i < 360; i+=vib) {
    stroke(color(i, 255,255));
    let osc = spectrum[i];
    let y = map(osc, 0, length*3, 0, height);
	let y2 = map(osc, 0, length, 0, height);
	drawingContext.shadowBlur = 32;
	drawingContext.shadowColor = color(207,7,99);
	line((radius - y) * cos(i), (radius - y)*sin(i), (y2 + radius) * cos(i), (y2 + radius)*sin(i));
	//line(radius * cos(i), radius * sin(i), (radius - y) * cos(i), (radius - y)*sin(i));
	//vertex()
  }
}

function mouseDragged(){
	//console.log(spectrum);
	if((mouseX - width/2) * (oldmouseY - height/2) - (mouseY - height/2) * (oldmouseX - width/2) < 0){ //vector product
		theta+=2;
		//rate+=0.001;
		length-=10;
	}
	else{
		theta-=2;
		//rate-=0.001;
		length+=10;
	}

	if(theta > 360){
		theta = 0;
	}
	if(theta < 0){
		theta = 360;
	}

	if(rate < 0.1){
		rate = 0.1;
	}

	oldmouseX = mouseX;
	oldmouseY = mouseY;
}

function mouseWheel(event) {
	vib++;
  }