var model = require('../models/acount');

module.exports = function (app) {

    app.post("/login", function (req, res) {
        var user = req.body.username;
        var pass = req.body.password;


        model.checkLogin(user, pass, function(success){
            if (success)
                res.redirect('/register');
            else
                res.render('index');
        })
    });
}