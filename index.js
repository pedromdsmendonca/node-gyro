const express = require('express')
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
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static('public'))

var serverSocket = null

io.on("connection", socket => {
    socket.on('server', () => {
        console.log('server registering')
        serverSocket = socket
    })
    socket.on('gyro', data => {
        if(serverSocket)
            serverSocket.emit('gyro', data)
    })
    socket.on('top', data => {
        if(serverSocket)
            serverSocket.emit('top', data)
    })
    socket.on('bottom', data => {
        if(serverSocket)
            serverSocket.emit('bottom', data)
    })
    socket.on('left', data => {
        if(serverSocket)
            serverSocket.emit('left', data)
    })
    socket.on('right', data => {
        if(serverSocket)
            serverSocket.emit('right', data)
    })
})