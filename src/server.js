var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
    const PORT = 3000
    console.log('listening on port ${PORT},');
});

// Static files using express.static and withing path for routes of folder
app.use(express.static('public'));

// Socket setup & pass server

var io = socket(server);
io.on('connection', (socket) => {

    console.log('socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});