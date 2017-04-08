var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
// Server 1
var socket = require("socket.io-client")('http://localhost:8102'); // This is a client connecting to the SERVER 2

var flag = require('./config/block-server.js');
var loginController = require("./api/controllers/login-controller");
var showController = require('./api/controllers/show-register');

var app = express();
var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.set("view engine", "ejs");

loginController(app);
showController(app);



app.get("/", function (req, res) {
    res.redirect('/show');
})

app.listen(port, function () {
    console.log("App listening on port: " + port);
})

socket.on('connect', function () {
    console.log("Server 2 Connect");
});