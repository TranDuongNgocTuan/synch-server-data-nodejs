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

    app.get("/register/:tourID", function (req, res) {
        var tourID = req.params.tourID;

        model.selectAllBus(function (rowsBus) {
            model.selectTour(tourID, function (tourBook){
                model.selectRestaurentInTour(tourID, function(rowRestaurent){
                    res.render('registerTour', {buss: rowsBus, tourID: tourID, tourBook: tourBook[0], restaurent: rowRestaurent });
                })
            })
        })
    });

    app.post('/register/customer', function (req, res) {
        var fullName = req.body.fullname;
        var phone = req.body.phone;
        var address = req.body.address;
        var tourID = req.body.tourID;
        var busID = req.body.busID;
        var numberAdult = req.body.numberAdult;
        var numberChild = req.body.numberChild;
        sql = "INSERT INTO `tours`.`register` (`fullName`, `phone`, `address`, `tourID`, `busID`, `numberAdult`, `numberChild`) VALUES ('" + fullName + "','" + phone + "','" + address + "','" + tourID + "','" + busID + "','" + numberAdult + "','" + numberChild + "')";

        checkFlag(sql);

        res.redirect('/show');
    });

    app.post('/register', function (req, res) {
        var fullName = req.body.fullname;
        var phone = req.body.phone;
        var address = req.body.address;
        var tourID = req.body.tourID;
        var busID = req.body.busID;
        var numberAdult = req.body.numberAdult;
        var numberChild = req.body.numberChild;
        sql = "INSERT INTO `tours`.`register` (`fullName`, `phone`, `address`, `tourID`, `busID`, `numberAdult`, `numberChild`) VALUES ('" + fullName + "','" + phone + "','" + address + "','" + tourID + "','" + busID + "','" + numberAdult + "','" + numberChild + "')";

        checkFlag(sql);

        res.render('notify-register');
    });

    socket.on("relay", function (data) {
        if (data.notify == 1){
             console.log(data);
        }else if (data.quantity == 1) {
            flag.changeFlagUnBlock();
            model.insertRegister(sql, flag);
            console.log(data);
        }
    })

    function checkFlag(sql) {
        if (flag.getFlag() == "no") {
            sendData(sql)
        } else {
            var interVal = setInterval(function () {
                if (flag.getFlag == "no") {
                    sendData(sql);
                    clearInterval(interVal);
                }
            }, 100);
            setTimeout(function () {
                clearInterval(interVal);
            }, 600)
        }
    }

    // send data when flag block no
    function sendData(sql) {
        flag.changeFlagBlock(); //block data
        socket.emit("message", { sql: sql, quantity: 2, mess: "send", n: 3 });
    }
}