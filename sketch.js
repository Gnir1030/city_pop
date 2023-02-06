
let song, buttton, fft;

function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('Ride On Time.mp3'); 
}

function setup() {
  createCanvas(600, 600);
  //angleMode(DEGREES); // Change the mode to DEGREES
  button = createButton('Play');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.8, 512);
}

function draw() {
  background(0);
  
  let spectrum = fft.analyze();
  console.log(spectrum);
  for (let i = 0; i < spectrum.length; i++) {
    stroke(255);
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    line(i, height, i, y);
  }
}

// Chrome 70 will require user gestures to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}