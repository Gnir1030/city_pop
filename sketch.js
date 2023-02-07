
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
  createCanvas(600, 600);
  //angleMode(DEGREES); // Change the mode to DEGREES
  button = createButton('Pause');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 512);
}

function draw() {
  background(0);
  fill(color('red'));
  let spectrum = fft.analyze();
  console.log(spectrum, spectrum.length);
  beginShape();
  vertex(0,height);
  for (let i = 0; i < spectrum.length; i++) {
    //stroke(random(0,255),random(0,255),random(0,255));
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
	vertex(i, y);
  }
  vertex(width,height);
  endShape();
}

// Chrome 70 will require user gestures to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}