var model = require('../models/tours');
var flag = require('../../config/block-server');

module.exports = function (app, socket) {
    var sql;
    var i = 0;

    app.get("/register", function (req, res) {
        model.selectAllTour(function (rowsTour) {
            model.selectAllBus(function (rowsBus) {
                res.render('register', { tours: rowsTour, buss: rowsBus });
            })
        })
    });

    app.post('/register', function (req, res) {
        var fullName = req.body.fullName;
        var phone = req.body.phone;
        var address = req.body.address;
        var tourID = req.body.tourID;
        var busID = req.body.busID;
        sql = "INSERT INTO register(fullName, phone, address, tourID, busID) VALUES('" + fullName + "','" + phone + "','" + address + "','" + tourID + "','" + busID + "')";

        socket.emit("message", { sql: sql, quantity: 2, mess: "send", n: 3 });
        flag.changeFlagBlock(); //block data

        res.redirect('/show');
    });

    socket.on("relay", function (data) {
        if (data.quantity == 1) {
            flag.changeFlagUnBlock();
            model.insertRegister(sql, flag);
            console.log(data);
        }
    })
}