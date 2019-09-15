const output = document.getElementById('output');

const socket = io();
socket.emit('cq-client', 'wrong code');

socket.on('register', msg => {
    console.log(msg)
    code = msg
})