var connection = require('../../config');

var changeStatusRestaurent = function (status) {
    connection.query("UPDATE restaurent SET status = " + status +"WHERE id = 2", function (err, rows, fields) {
        if (err) throw err;
    });
}

var changeStatusCar = function (status) {
    connection.query("UPDATE car SET status = " + status +"WHERE id = 1", function (err, rows, fields) {
        if (err) throw err;
    });
}

var selectAllRestaurent = function (callback) {
    connection.query("SELECT * FROM restaurent", function (err, rows, fields) {
        if (err) throw err;
        return callback(rows);
    });
}

var selectAllCar = function () {
    connection.query("SELECT * FROM car", function (err, rows, fields) {
        if (err) throw err;
    });
}

module.exports = {
    changeStatusRestaurent: changeStatusRestaurent,
    changeStatusCar: changeStatusCar,
    selectAllRestaurent: selectAllRestaurent,
    selectAllCar: selectAllCar
}