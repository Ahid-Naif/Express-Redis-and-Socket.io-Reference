const express  = require('express');
const socketio = require('socket.io');

const app    = express();
const server = app.listen(8080);
const io     = socketio(server);

app.use(express.static('static'));

io.on("connection", (socket) => {
    socket.on('socketping', () => {
        console.log('Received socketping, sending socketpong');
        socket.emit('socketpong');
    });
});