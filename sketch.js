
let song, buttton, fft;

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
  song = loadSound('Ride On Time.mp3'); 
}

function setup() {
  createCanvas(1000, 600);
  angleMode(DEGREES); // Change the mode to DEGREES
  button = createButton('Pause');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 1024);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  noFill();
  //stroke(color('red'));
  let spectrum = fft.analyze();
  let length = 512;
  radius = 100;
  console.log(spectrum, spectrum.length);
  //beginShape();
  //vertex(0,height/2);
  for (let i = 0; i < 360; i++) {
    stroke(color(i*255/360,255,255));
    let amp = spectrum[i];
    let y = map(amp, 0, length*3, 0, height);
	let y2 = map(amp, 0, length, 0, height);
	//vertex(i, y - height/2);
	//vertex((y2 + radius) * cos(i), (y2 + radius)*sin(i));
	//vertex(i, y2);
	//vertex((radius - y) * cos(i), (radius - y)*sin(i));
	line(radius * cos(i), radius * sin(i), (y2 + radius) * cos(i), (y2 + radius)*sin(i));
	line(radius * cos(i), radius * sin(i), (radius - y) * cos(i), (radius - y)*sin(i));
  }
  //endShape(CLOSE);
  //ellipse(0,0, radius*2, radius*2); 
}