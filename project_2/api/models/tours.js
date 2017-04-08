var connection = require('../../config');

var selectAll = function () {

    connection.query("Select * from place", function (err, rows, fields) {
        if (err) throw err;

        rows.forEach(function (element) {
            console.log(element);
        }, this);
        return;
    });
}

var selectAllTour = function (callback) {
    connection.query("Select * from tour", function (err, rows, fields) {
        if (err) throw err;
        return callback(rows);
    });
}

var selectAllBus = function (callback) {
    connection.query("Select * from bus", function (err, rows, fields) {
        if (err) throw err;
        return callback(rows);
    });
}

var insertRegister = function (sql, flag) {
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err;
        });
}

var selectAllRegister = function (callback) {
    connection.query("SELECT register.id, fullName, register.phone, register.address, nameTour, nameService"
        + " from register inner join tour"
        + " on register.tourID = tour.id"
        + " inner join bus"
        + " on register.busID = bus.id", function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
}

module.exports = {
    selectAll: selectAll,
    selectAllTour: selectAllTour,
    selectAllBus: selectAllBus,
    insertRegister: insertRegister,
    selectAllRegister: selectAllRegister
}