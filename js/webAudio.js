var context;
var soundBuffers = [];

window.addEventListener(
  'load', init, false
);

function init() {
  console.log('init!');
  setUpContext();
  setUpLinks();
}

function setUpLinks() {
  console.log('setUpLinks!');

  var i = 0;

  $('.soundLink').each(function() {
    console.log('link: ', this);

    loadSound(this.href, i);

    $(this).click(function(e) {
      e.preventDefault();
      playSound(i);
    });

    i++;
  });
}

function setUpContext() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();

    console.log('context created!');

    // loadSound(soundURL);
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}

function loadSound(soundURL, i) {
  console.log('loadSound!');

  var request = new XMLHttpRequest();

  request.open('GET', soundURL, true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      soundBuffers[i] = buffer;
      console.log('sound loaded!')
    });
  }

  request.send();
}


function playSound() {
  console.log('playSound!');
}

console.log('soundBuffers: ', soundBuffers);
