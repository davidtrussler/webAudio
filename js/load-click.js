var context,
    bufferLoader,
    bufferList;

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
  var sounds = [];

  $('.soundLink').each(function() {
    var name = this.href.split('/')[this.href.split('/').length - 1].split('.')[0];

    sounds.push(this.href);

    $(this).click(function(e) {
      e.preventDefault();
      playSound(e.target);
    });
  });

  bufferLoader = new BufferLoader(context, sounds);
  bufferList = bufferLoader.load();
}

function playSound(link) {
  var source = context.createBufferSource();

  source.buffer = bufferList[$(link).parent().index()];
  source.connect(context.destination);
  source.start(0);
}
