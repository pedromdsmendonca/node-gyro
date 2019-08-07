const socket = io();

document.addEventListener("DOMContentLoaded", function(event) {
    var output = $('.output'),
        bgImg = $('.wrapper'),
  
        rotX = 0,
        rotY = 0,
  
        wrapperWidth = $('body').width(),
        wrapperHeight = $('body').height(),
  
        bgImgWidth = bgImg.width(),
        bgImgHeight = bgImg.height(),
  
        moveMaxHeight = (bgImgHeight - wrapperHeight)/2,
        moveMaxWidth = (bgImgWidth - wrapperWidth)/2
    ;

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

        a = Math.round(_a);
        b = Math.round(_b);
        g = Math.round(_g);
        
        //   rotY += (g - rotY) / 5;
        //   rotX += (b - rotX) / 5;
    
        output.text('gamma: ' + g + ' / beta: ' + b + ' / alpha: ' + a);
        socket.emit('gyro', `${a}:${b}:${g}`)
        //   bgImg.css('transform', 'rotateY('+rotY+'deg) rotateX('+rotX+'deg)');
    }
});