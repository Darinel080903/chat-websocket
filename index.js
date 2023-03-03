const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) =>{
    console.log('new connection', socket.id)

    socket.on('chat:message', (data) =>{
        io.emit('chat:message', data)
    })

    socket.on('chat:typing', (data) =>{
        console.log(data)
        //broadcast.emit('chat:typing', data)
    })

    socket.on('image', (data) => {
        console.log('image received');
        io.emit('image', data);
    });

})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

