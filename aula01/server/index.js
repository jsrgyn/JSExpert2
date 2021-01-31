const server = require('http').createServer((request, response) => {
    response.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    })
    response.end('hey there!')
})

const socketIo = require('socket.io')
const io = socketIo(server, {
    cors: {
        origin: '*',
        credentials: false
    }
})

io.on('connection', socket => {
    console.log('connection', socket.id)
    socket.on('join-room', (roomId, userId) => {
        // adiciona os usuarios na mesma sala
        socket
    })
})