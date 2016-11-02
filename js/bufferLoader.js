/*
Original source: https://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
**/

function BufferLoader(context, urlList) {
  this.context = context;
  this.urlList = urlList;
  this.bufferList = new Array();
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  var loader = this;

  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }

        loader.bufferList[index] = buffer;
      },

      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);

  return this.bufferList;
}
