
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
colorMode(HSB);
  createCanvas(600, 600);
  space_between_lines = width/128;
  //angleMode(DEGREES); // Change the mode to DEGREES
  button = createButton('Pause');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 256);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  console.log(spectrum, spectrum.length);
  for (let i = 0; i < spectrum.length; i++) {
    //stroke(random(0,255),random(0,255),random(0,255));
    let amp = spectrum[i];
    let y = map(amp, 0, 1024, height, 0);
	fill(i,255,255);
	rect(i * space_between_lines, height/2, space_between_lines, height - y);
	rect(i * space_between_lines, y - height/2 , space_between_lines, height - y);
  }
}

// Chrome 70 will require user gestures to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}