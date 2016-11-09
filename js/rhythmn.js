var context,
    bufferLoader,
    bufferList,
    bpm = 120,      // BPM
    signature = 4;  // beats per bar

window.addEventListener(
  'load', init, false
);

function init() {
  setUpContext();
  setUpLink();
  loadSounds();
}

function setUpContext() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}

function setUpLink() {
  $('.play').click(function() {
    play();
  });
}

function loadSounds() {
  var sounds = [
    'sounds/hihat-acoustic01.wav',
    'sounds/kick-acoustic01.wav',
    'sounds/snare-acoustic01.wav'
  ];

  bufferLoader = new BufferLoader(context, sounds);
  bufferList = bufferLoader.load();
}

function play() {
  var beat = 0;
  var time = 60 / bpm;
  var startTime = context.currentTime;

  // play 3 bars
  for (var bar = 0; bar < 3; bar++) {
    // kick drum on each beat
    for (var beat = 0; beat < signature; beat++) {
      playSound(bufferList[1], (bar * time * signature) + (beat * time) + startTime);
    }

    // hi hat on every second beat
    for (var beat = 0; beat < signature * 2; beat++) {
      playSound(bufferList[0], (bar * time * signature) + (beat * (time / 2)) + startTime);
    }

    // snare on every second beat
    for (var beat = 0; beat < signature / 2; beat++) {
      playSound(bufferList[2], (bar * time * signature) + (beat * (time * 2)) + startTime);
    }
  }
}

function playSound(buffer, time) {
  var source = context.createBufferSource();

  source.buffer = buffer; // bufferList[$(link).parent().index()];
  source.connect(context.destination);
  source.start(time);
}
