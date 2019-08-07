const socket = io();

let alpha, beta

function calibrateTop(){
    socket.emit('top', beta);
}
function calibrateBottom(){
    socket.emit('bottom', beta);
}
function calibrateLeft(){
    socket.emit('left', alpha);
}
function calibrateRight(){
    socket.emit('right', alpha);
}

document.addEventListener("DOMContentLoaded", function(event) {
    var output = $('.output');
    
    if ( window.DeviceMotionEvent ) { 
      window.ondeviceorientation = function(event) {
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;
        setTimeout(function(){
          normalizeData(alpha, gamma, beta)
        }, 50)
      }  
    }
  
    function normalizeData(_a, _g, _b){
        alpha = _a
        beta = _b

        socket.emit('gyro', `${_a}:${_b}:${_g}`)
    }
});