// Server 2
var model = require('./models/tours.js');
var io = require("socket.io").listen(8102);
var other_server = require("socket.io-client")('http://localhost:8103'); // This is a client connecting to the SERVER 2

other_server.on('connect', function () {
    console.log('Server 3 Connected!');
});

io.on("connection", function (socket) {
    var sql;

    // Display a connected message
    console.log("Server 1 Connected!");

    // other_server.on("replay", function (vote) {
    //     console.log(vote);
    //     if (vote == "success") {
    //         model.insertRegister(data);
    //         socket.emit("replay", "success" + i++);
    //     }
    //     console.log(i);
    // })

    // socket.on("disconnect", function (data) {
    //     // We need to notify Server 2 that the client has disconnected
    //     other_server.emit("message", "UD," + socket.id);
    // });

    // When we receive a message...
    socket.on("message", function (data) {
        // We need to just forward this message to our other guy
        // We are literally just forwarding the whole data packet
        console.log(data); // show data send to server 1

        sql = data;

        other_server.emit("message 3", sql);
    });

    other_server.on("replay 3", function (vote) {
        console.log(vote);
        if (vote == "success") {
            io.emit("replay", "success");
            console.log(sql);
            model.insertRegister(sql);
            
        }
    })

});




