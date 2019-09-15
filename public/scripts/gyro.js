const socket = io();
socket.emit('player', 'i am a player')
let player = 0

socket.on("register", data => {
    player = Number(data)
})

let alpha, beta

function calibrateTopLeft(){
    socket.emit('topLeft', player + ':' + alpha + ':' + beta);
}

function calibrateBottomRight(){
    socket.emit('bottomRight', player + ':' + alpha + ':' + beta);
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

        socket.emit('gyro', `${player}:${_a}:${_b}:${_g}`)
    }
});