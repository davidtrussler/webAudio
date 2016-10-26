var context;

window.addEventListener(
  'load', init, false
);

function init() {
  console.log('init!');

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}
