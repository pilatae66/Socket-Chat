let express = require('express')
let socket = require('socket.io')
let app = express()
let server = app.listen(process.env.PORT || 3001, () => {
    console.log('listening to port 3001')
})

app.use(express.static(__dirname + 'public'))

let io = socket(server)
io.on('connection', (socket) => {
    console.log(`connected to port 3001 with socket id of ${socket.id}`);
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('not-typing', () => {
        socket.broadcast.emit('not-typing')
    })

    socket.on('user-login', (data) => {
        socket.broadcast.emit('user-login', data)
    })
})