const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    
    io.emit('chat message', `conected ${socket}`);
    // console.log('a user connected', Object.keys(socket));
    // });
    
    // io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
// });

// io.on('connection', (socket) => { 
    socket.on('chat message', (msg) => {
      io.emit('chat message', `${msg.user}: ${msg.msg}`); 
    });

    socket.on("disconnecting", () => {
        console.log('disconnecting', socket.rooms); // the Set contains at least the socket ID
      });
    
      socket.on("disconnect", () => {
        // socket.rooms.size === 0
        console.log('disconnect')
      });
 });


 // This will emit the event to all connected sockets
// If you want to send a message to everyone except for a certain emitting socket,
// we have the broadcast flag for emitting from that socket:
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });


server.listen(3000, () => {
    console.log('listening on *:3000');
}); 