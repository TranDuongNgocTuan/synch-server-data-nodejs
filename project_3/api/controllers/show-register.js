var model = require('../models/tours');
var flag = require('../../config/block-server');

module.exports = function (app) {

    app.get("/show", function (req, res) {
        var yes = false;
        var block = flag.getFlag();
        
        if (block == "yes") {
            yes = true;
        }
        var interVal = setInterval(function () {
            block = flag.getFlag();
            if (block == "no") {
                yes = true;
            }
        }, 200);
        if (yes) {
            clearInterval(interVal);
            model.selectAllRegister(function (rowsRegister) {
                res.render('show', { register: rowsRegister });
            })
        }
        
        setTimeout(function(){
            clearInterval(interVal);
            model.selectAllRegister(function (rowsRegister) {
                res.render('show', { register: rowsRegister });
            })
        }, 600);
        // setImmediate(function () {
        //     block = flag.getFlag();
        //     model.selectAllRegister(function (rowsRegister) {
        //         res.render('show', { register: rowsRegister });
        //     })
        // }, 200);
    });
}