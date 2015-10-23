"use strict";

// Globals
var gainNode = null;
var oscillator = null;
var max_amp = 1;
var min_amp = 0;


$(document).ready(function(){
    start();
});

function init(){
    var context = new AudioContext;
    gainNode = context.createGain();
    oscillator = context.createOscillator();

    set_freq(440);
    set_volume(0.1);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
}

function start(){
    if(oscillator){
        stop();
    }
    init();
    oscillator.start();
}

function stop(){
    oscillator.stop();
}

function set_volume(amp){
    // Ensure amplitude is between min_amp and max_amp
    Math.max(Math.min(amp, max_amp), min_amp);
    // Set amplitude
    gainNode.gain.value = amp;
}

function set_freq(freq){
    oscillator.frequency.value = freq;
}
