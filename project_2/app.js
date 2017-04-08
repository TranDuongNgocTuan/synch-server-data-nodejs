var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
// Server 2
var socket = require("socket.io").listen(8102);
// Server 3
var other_socket = require("socket.io-client")('http://localhost:8103'); // This is a client connecting to the SERVER 2

var config = require("./config");
var loginController = require("./api/controllers/login-controller");
var registerController = require("./api/controllers/register-controller");
var showController = require('./api/controllers/show-register');
var syncData = require('./api/controllers/sync-data.js');

var app = express();
var port = process.env.PORT || 2000;

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.set("view engine", "ejs");

// app.locals.flag = flag;

app.use(loginController);
registerController(app, other_socket);
showController(app);
syncData(socket, other_socket);

app.get("/", function (req, res) {
    res.render("index");
})

app.listen(port, function () {
    console.log("App listening on port: " + port);
})

other_socket.on('connect', function () {
    console.log("Connect server 3");
});