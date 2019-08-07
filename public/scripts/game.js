const output = document.getElementById('output');

const socket = io();
socket.emit('server', 'i am the server now')

let leftCal, rightCal, topCal, bottomCal 

socket.on('gyro', msg => {
    // console.log(msg)
    msg = msg.split(':')
    var a = Number(msg[0])
    var b = Number(msg[1])

    this.output.innerText = `alpha: ${a} betta: ${b}`

    draw(a, b)
})

socket.on('top', msg => {
    console.log('TOP ' + msg)
    topCal = Number(msg)
})
socket.on('bottom', msg => {
    console.log('BOTTOM ' + msg)
    bottomCal = Number(msg)
})
socket.on('left', msg => {
    console.log('LEFT ' + msg)
    leftCal = Number(msg)
})
socket.on('right', msg => {
    console.log('RIGHT ' + msg)
    rightCal = Number(msg)
})

function draw(a, b){
    console.log(topCal)
    var xOffset = leftCal - a
    var yOffset = topCal - b

    var bx = document.getElementById("box");
    bx.style.left = window.innerWidth * xOffset / (leftCal - rightCal);
    bx.style.top = window.innerHeight * yOffset / (topCal - bottomCal);
}