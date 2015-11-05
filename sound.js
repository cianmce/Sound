"use strict";

// Globals
var gainNode   = null;
var oscillator = null;
var loop_delay = 3*1000; //3 seconds delay


$(document).ready(function(){
    start();
    // Set interval to check every server every "loop_delay" seconds
    setInterval(check_server, loop_delay);
    // run once at the start
    check_server();
});

function init(){
    var context = new AudioContext;
    gainNode = context.createGain();
    oscillator = context.createOscillator();

    set_freq(40);
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
    // Set amplitude
    if(gainNode)
        gainNode.gain.value = amp;
}

function set_freq(freq){
    if(oscillator)
        oscillator.frequency.value = freq;
}

function set_color(RGB_array){
    // Round values down
    var r = Math.floor(RGB_array[0]);
    var g = Math.floor(RGB_array[1]);
    var b = Math.floor(RGB_array[2]);
    $('body').css('background-color', 'rgb('+r+','+g+','+b+')');
}

function check_server(){
    var url = '/bouy.php';
    $.get(url, function(data) {
        console.log(data);
        set_color(data.color);
        set_volume(data.volume);
        set_freq(data.frequency);
    });
}

