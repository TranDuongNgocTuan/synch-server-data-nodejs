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

var selectAllTourHoiAn = function (place, callback) {
    connection.query("SELECT * FROM tour WHERE placeEnd = (SELECT id FROM place WHERE places ='"+place+"');", function (err, rows, fields) {
        if (err) throw err;
        return callback(rows);
    });
}

var selectAllBus = function (callback) {
    connection.query("Select * from busservices", function (err, rows, fields) {
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
        + " inner join busservices"
        + " on register.busID = busservices.id", function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
}

var selectTour = function(tourID, callback){
    connection.query("Select * from tour WHERE id = '"+tourID+"'", function (err, rows, fields) {
        if (err) throw err;
        return callback(rows);
    });
}

module.exports = {
    selectAll: selectAll,
    selectAllTourHoiAn: selectAllTourHoiAn,
    selectAllBus: selectAllBus,
    selectTour: selectTour,
    insertRegister: insertRegister,
    selectAllRegister: selectAllRegister
}