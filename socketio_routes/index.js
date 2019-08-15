const express = require('express');
const socketio = require('socket.io');
const router = require('./routes.js');
const sockets = require('./sockets.js');

var app = express();
var server = app.listen(8080);
var io = socketio(server);


//setup express to use middleware
app.use('/', router);

var bears = io.of('/bears');
var cubs = io.of('/cubs');
bears.on('connection', sockets.bearsNamespace);
cubs.on('connection', sockets.cubsNamespace);

io.on('connection', (socket) => {
  //we need specific events for each
  //cubs and bears
});