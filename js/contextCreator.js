var ContextCreator = function() {}

ContextCreator.prototype.setUp = function() {
  console.log('setUp!');

  var context = {}

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new window.AudioContext();
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }

  return context;
}
