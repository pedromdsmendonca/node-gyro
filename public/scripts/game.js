const output = document.getElementById('output');

const socket = io();
socket.emit('server', 'i am the server now')

socket.on('gyro', msg => {
    console.log(msg)
    msg = msg.split(':')
    var a = Number(msg[0])
    var b = Number(msg[1])

    this.output.innerText = `alpha: ${a} betta: ${b}`

    draw(a, b)
})

function draw(a, b){
    var xOffset = 120 - a
    var yOffset = 30 - b

    var bx = document.getElementById("box");
    bx.style.left = window.innerWidth * xOffset / 60;
    bx.style.top = window.innerHeight * yOffset / 30;
}