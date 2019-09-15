const express = require('express')
const socketRouter = require('./sockets')
const app = express()
const PORT = process.env.PORT || 5000

var fs = require('fs')
var https = require('https')

var server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)

var io = require('socket.io')(server);

server.listen(PORT, function () {
    console.log('started listening on port ' + PORT)
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/game', function(req, res){
    res.sendFile(__dirname + '/game.html');
});
app.get('/cq', function(req, res){
    res.sendFile(__dirname + '/cq.html');
});
app.get('/cqp', function(req, res){
    res.sendFile(__dirname + '/cq-player.html');
});
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static('public'))

var serverSocket = null
var lastPlayer = -1

cqServerSockets = {}

io.on("connection", socket => {
    socket.on('player', () => {
        console.log('player registering')
        socket.emit('register', ++lastPlayer)
    })
    socket.on('server', () => {
        console.log('server registering')
        serverSocket = socket
    })
    socket.on('gyro', data => {
        if(serverSocket)
            serverSocket.emit('gyro', data)
    })
    socket.on('topLeft', data => {
        console.log('tl ' + data)
        if(serverSocket)
            serverSocket.emit('calibrate', '0:' + data)
    })
    socket.on('bottomRight', data => {
        console.log('br ' + data)
        if(serverSocket)
            serverSocket.emit('calibrate', '1:' + data)
    })

    socketRouter(socket)
})