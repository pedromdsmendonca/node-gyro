players = []

const output = document.getElementById('output');

const socket = io();
socket.emit('cq-server', 'i am the server now');

socket.on('register', msg => {
    console.log(msg)
    code = msg
})