This is a basic implementation of the WebAudio API set up for general experimentation.

Based on the tutorial here: https://www.html5rocks.com/en/tutorials/webaudio/intro/

Broken down into iterations to keep different experiments separate and re-use modules where possible:
- **load-click.html**: loads a number of sounds and allows the user to play them by clicking a link
- **rhythmn**: plays a pre-set rhythmic piece. This feels a bit unsatisfactory TBH: takes things the wrong way round IMO - definces times rather than calling the sounds on a pulse.

TODO
- use JQuery for XHR Request
- use requirejs to load modules
