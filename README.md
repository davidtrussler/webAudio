This is a basic implementation of the WebAudio API set up for general experimentation.

Based on the tutorial here: https://www.html5rocks.com/en/tutorials/webaudio/intro/

Broken down into iterations to keep different experiments separate and re-use modules where possible:

- **load-click.html**: loads a number of sounds and allows the user to play them by clicking a link

- **rhythmn**: plays a pre-set rhythmic piece. This feels a bit unsatisfactory TBH: takes things the wrong way round IMO - definces times rather than calling the sounds on a pulse.

- **rhythmn-extended**: tries a different concept for dealing with rhythmn - calls the playSound method on each beat. Allows playing indefinitely on start/stop events. For this to be workable need to rewrite rhythmn.js as object. Not a bad thing anyway!

- **context-creator**: Creates a new object fro the audio context. Useful going forward to separate out into re-usable modules.

- **volume-control**: adds a single volume control to the app


TODO
- use JQuery for XHR Request
- use requirejs to load modules (well maybe)
