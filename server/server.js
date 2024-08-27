
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
        methods: ["GET", "POST"] // Specify allowed methods
    }
});

io.on('connection', (socket)=> {
    console.log("User Online");

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    });

    // Listen for chat messages
    socket.on("chat-message", (message) => {
        console.log("New message from user");
        socket.broadcast.emit("chat-message", message);
        // Broadcast message to all users
    });

    // Listen for clear board requests and broadcast to all clients
    socket.on('clear-board', () => {
        io.emit('clear-board');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
})