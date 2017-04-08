var model1 = require('../models/tours_1');
var model2 = require('../models/tours_2');
var model3 = require('../models/tours_3');

module.exports = function (app, io, other_server, flag) {
   

    app.get("/show", function (req, res) {
        var server = req.body.server;
        if (server == "1")
            model1.selectAllRegister(function(rowsRegister){
                res.render('management-server', {register: rowsRegister});
            });
        if (server == "2")
            model2.selectAllRegister(function(rowsRegister){
                res.render('management-server', {register: rowsRegister});
            });
        if (server == "3")
            model3.selectAllRegister(function(rowsRegister){
                res.render('management-server', {register: rowsRegister});
            });
        else{
            model1.selectAllRegister(function(rowsRegister){
                res.render('management-server', {register: rowsRegister});
            });
        }
    });    
}