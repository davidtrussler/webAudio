var context;
var soundURL = 'sounds/COSM114.mp3';
var soundBuffer = null;

window.addEventListener(
  'load', init, false
);

function init() {
  console.log('init!');

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();
    loadSound(soundURL);
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}

function loadSound(soundURL) {
  console.log('loadSound!');

  var request = new XMLHttpRequest();

  request.open('GET', soundURL, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      soundBuffer = buffer;
    });
  }

  request.send();
}
