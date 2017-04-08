// Server 3
var model = require('./models/tours.js');
var io = require("socket.io").listen(8103);

io.sockets.on("connection", function (socket) {
    // Display a connected message
    console.log("Server 2 Connected!");

    socket.on("message 3", function (data) {
        // When we receive a message...
        // We got a message... I dunno what we should do with this...
        socket.emit("replay 3", "success");
        model.insertRegister(data);
        console.log(data);
    });
})

