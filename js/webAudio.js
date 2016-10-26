var context;
var soundBuffers = [];

window.addEventListener(
  'load', init, false
);

function init() {
  setUpContext();
  setUpLinks();
}

function setUpContext() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}

function setUpLinks() {
  $('.soundLink').each(function() {
    var name = this.href.split('/')[this.href.split('/').length - 1].split('.')[0];

    loadSound(this.href, name);

    $(this).click(function(e) {
      e.preventDefault();
      playSound(name);
    });
  });
}

function loadSound(soundURL, name) {
  var request = new XMLHttpRequest();

  request.open('GET', soundURL, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      soundBuffers[name] = buffer;
      console.log('sound loaded!')
    });
  }

  request.send();
}


function playSound(name) {
  console.log(name);

  var source = context.createBufferSource();

  source.buffer = soundBuffers[name];
  source.connect(context.destination);
  source.start(0);
}

console.log('soundBuffers: ', soundBuffers);
