var model = require('../models/tours');
var flag = require('../../config/block-server');

module.exports = function (io, socket_this, other_socket) {
    var sql = "";

    socket_this.sockets.on('connection', function (socket) {
        console.log("Connect server 3");

        socket.on("message", function (data) {
            if (data.notify == 1) {
                if (data.quantity < data.n && data.mess == "send") {
                    sql = data.sql;
                    sendNotify(data);
                    flag.changeFlagBlock();
                    io.sockets.emit('message', data.notify);
                } else if (data.quantity == data.n) {
                    flag.changeFlagUnBlock();
                    relayNotify(data);
                    io.sockets.emit('message', data.notify);
                }
            }
            else if (data.notify != 0){
                if (data.quantity < data.n && data.mess == "send") {
                    sql = data.sql;
                    sendData(data);
                    flag.changeFlagBlock();

                } else if (data.quantity == data.n) {
                    flag.changeFlagUnBlock();
                    model.insertRegister(data.sql, flag);
                    relayData(data);
                }
            }
            console.log(data);
        });

    })

    other_socket.on("relay", function (data) {
        if (data.notify == 1) {
            if (data.quantity > 1 && data.mess == "success"){
                relayNotify(data);
                flag.changeFlagUnBlock();
            }
        } else if (data.quantity > 1 && data.mess == "success") {
            relayData(data);
            flag.changeFlagUnBlock();
            model.insertRegister(sql, flag);
        }
    })

    function relayData(data) {
        --data.quantity;
        socket_this.emit("relay", { quantity: data.quantity, mess: "success", n: data.n });
    }

    function sendData(data) {
        ++data.quantity;
        other_socket.emit("message", { sql: data.sql, quantity: data.quantity, mess: "send", n: data.n });
    }

    function relayNotify(data) {
        --data.quantity;
        socket_this.emit("relay", { notify: '1', quantity: data.quantity, mess: "success", n: data.n });
    }

    function sendNotify(data) {
        ++data.quantity;
        other_socket.emit("message", { notify: '1', postion: '1', content: 'error', quantity: data.quantity, mess: "send", n: data.n });
    }
}