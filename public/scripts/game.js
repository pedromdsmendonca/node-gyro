const output = document.getElementById('output');

const socket = io();
socket.emit('server', 'i am the server now')

let leftCal = [], rightCal = [], topCal = [], bottomCal = [] 
let boxes

socket.on('gyro', msg => {
    // console.log(msg)
    msg = msg.split(':')
    var player = Number(msg[0])
    var a = Number(msg[1])
    var b = Number(msg[2])

    if(player === 0){
        draw1(a,b)
    }
    else{
        draw2(a,b)
    }
    // draw(a, b, player)
})

socket.on('calibrate', msg => {
    msg = msg.split(":")
    var coord = Number(msg[0]) //player
    var player = Number(msg[1])  //top-left or bottom-right
    var alpha = Number(msg[2])
    var beta = Number(msg[3])

    if(coord == 0){
        topCal[player] = beta
        leftCal[player] = alpha
    }
    else{
        bottomCal[player] = beta
        rightCal[player] = alpha
    }
})

function draw(a, b, player){
    console.log(player)
    var xOffset = (leftCal[player] - a) / (leftCal[player] - rightCal[player]);
    var yOffset = (topCal[player] - b) / (topCal[player] - bottomCal[player]);

    console.log(boxes[player])

    boxes[player].style.left = window.innerWidth * xOffset;
    boxes[player].style.top = window.innerHeight * yOffset;
}

function draw1(a, b){
    console.log('draw box0 red')
    var xOffset = (leftCal[0] - a) / (leftCal[0] - rightCal[0]);
    var yOffset = (topCal[0] - b) / (topCal[0] - bottomCal[0]);

    boxes[0].style.left = window.innerWidth * xOffset;
    boxes[0].style.top = window.innerHeight * yOffset;
}

function draw2(a, b){
    console.log('draw box1 blue')
    var xOffset = (leftCal[1] - a) / (leftCal[1] - rightCal[1]);
    var yOffset = (topCal[1] - b) / (topCal[1] - bottomCal[1]);

    boxes[1].style.left = window.innerWidth * xOffset;
    boxes[1].style.top = window.innerHeight * yOffset;
}

$( document ).ready(function() {
    console.log( "ready!" );
    boxes = [document.getElementById("box0"), document.getElementById("box1")]
    console.log(boxes)
});