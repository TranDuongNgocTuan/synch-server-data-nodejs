var connection = require('../config');

var login = function (username, password, callback) {

    connection.query("Select * from account where username ='" + username + "' and password = '" + password + "'",

        function (err, rows, fields) {
            if (err) throw err;

            console.log(rows.length);

            if (rows.length > 0)
                return callback(true);
            else
                return callback(false);
        });
}

module.exports = {
    checkLogin: login
}