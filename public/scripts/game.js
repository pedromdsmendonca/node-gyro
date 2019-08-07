const output = document.getElementById('output');

const socket = io();
socket.emit('server', 'i am the server now')

socket.on('gyro', msg => {
    console.log(msg)
    this.output.innerText = msg
})