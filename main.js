"use strict";

// Globals
var gainNode   = null;
var oscillator = null;
var loop_delay = 10*1000; //10 seconds delay


$(document).ready(function(){
    start();
    // Set interval to check every server every "loop_delay" seconds
    setInterval(check_server_loop, loop_delay);
    // run once at the start
    check_server_loop();
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

function componentToHex(c) {
    var hex = Math.floor(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function set_color(hex_color){
    $('body').css('background-color', hex_color);
}

function check_server_loop(){
    current_buoy++;
    current_buoy%=buoy_coords.length;
    var url = '/buoy.php?buoy='+current_buoy;
    console.log("url: "+url);
    $.get(url, function(data) {
        console.log(data);
        var hex_color = rgbToHex(data.color[0], data.color[1], data.color[2]);
        set_color(hex_color);
        update_map(hex_color, current_buoy);
        set_volume(data.volume);
        set_freq(data.frequency);
    }).fail(function() {
       check_server_loop();
    });
}

