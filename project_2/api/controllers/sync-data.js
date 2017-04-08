var model = require('../models/tours');
var flag = require('../../config/block-server');

module.exports = function (socket_list, other_socket) {
    var sql = "";
    socket_list.sockets.on('connection', function (socket) {
        console.log("Connect server 1");

        socket.on("message", function (data) {
            if (data.quantity < data.n && data.mess == "send") {
                sql = data.sql;
                sendData(data);
                flag.changeFlagBlock();
                
            } else if (data.quantity == data.n) {
                flag.changeFlagUnBlock();
                model.insertRegister(data.sql, flag);
                relayData(data);
            }
            console.log(data);
        });
    })

    other_socket.on("relay", function (data) {
        if (data.quantity > 1 && data.mess == "success") {
            relayData(data);
            flag.changeFlagUnBlock();
            model.insertRegister(sql, flag);
        }
    })

    function relayData(data) {
        --data.quantity;
        socket_list.emit("relay", { quantity: data.quantity, mess: "success", n: data.n });
    }

    function sendData(data) {
        ++data.quantity;
        other_socket.emit("message", { sql: data.sql, quantity: data.quantity, mess: "send", n: data.n });
    }
}