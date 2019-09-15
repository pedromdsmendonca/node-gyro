module.exports = socket => {
    socket.on('cq-server', msg => {
        let code = getRandomRoomCode()
        cqServerSockets.code = socket
        socket.emit('register', code)
    })
    socket.on('cq-client', msg => {
        //TODO parse msg for room code + player name + any extra info
        if(!cqServerSockets[msg]){
            console.log('attempting connection with invalid room code')
            return
        }
        cqServerSockets[msg].emit('player', 'new player connecting')
    })
}

getRandomRoomCode = () => {
    //TODO better generation and check if exists or not
    return Math.random().toString(36).substring(7);
}