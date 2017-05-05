'use strict';

var Rhythmn = function() {
  this.context;
  this.bufferLoader;
  this.bufferList;
  this.bpm = 120;     // BPM
  this.signature = 4; // beats per bar
  this.playState;
}

Rhythmn.prototype.init = function() {
  console.log('this: ', this);
  console.log('init!')

  this._setUpContext();
  this._setUpLink();
  this._loadSounds();
}

Rhythmn.prototype._setUpContext = function() {
  console.log('_setUpContext!');

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new window.AudioContext();
  } catch(e) {
    console.log('WebAudio API is not supported in this browser!');
  }
}

Rhythmn.prototype._setUpLink = function() {
  console.log('_setUpLink!');

  var _this = this;

  $('.start').click(function() {
    _this.playState = true;
    _this._play();
  });

  $('.stop').click(function() {
    _this.playState = false;
  });
}

Rhythmn.prototype._loadSounds =  function() {
  var sounds = [
    'sounds/hihat-acoustic01.wav',
    'sounds/kick-acoustic01.wav',
    'sounds/snare-acoustic01.wav'
  ];

  this.bufferLoader = new BufferLoader(this.context, sounds);
  this.bufferList = this.bufferLoader.load();
}

Rhythmn.prototype._play =  function() {
  console.log('play!');

  var _this = this;
  var time = (60 / _this.bpm) * 1000;

  // kick drum on each beat
  var intervalID_kick = window.setInterval(
    function() {
      if (_this.playState == true) {
        _this._playSound(_this.bufferList[1], _this.context.currentTime);
      } else {
        clearInterval(intervalID_kick);
      }
    },
    time
  );

  // hi hat on every second beat
  var intervalID_hh = window.setInterval(
    function() {
      if (_this.playState == true) {
        _this._playSound(_this.bufferList[0], _this.context.currentTime);
      } else {
        clearInterval(intervalID_hh);
      }
    },
    time * 2
  );

  // snare on every second beat
  var intervalID_snare = window.setInterval(
    function() {
      if (_this.playState == true) {
        _this._playSound(_this.bufferList[2], _this.context.currentTime);
      } else {
        clearInterval(intervalID_snare);
      }
    },
    time * 2
  );
}

Rhythmn.prototype._playSound =  function(buffer, time) {
  console.log('_playSound!');

  var source = this.context.createBufferSource();

  source.buffer = buffer;
  source.connect(this.context.destination);
  source.start(time);
}
