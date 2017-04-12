var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require('path');
// Server 1
var socket = require("socket.io").listen(8101);
// Server 2
var other_socket = require("socket.io-client")('http://localhost:8102'); // This is a client connecting to the SERVER 2
// Send notify
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var config = require("./config");
var homeController = require('./api/controllers/home-search-controller');
var loginController = require("./api/controllers/login-controller");
var registerController = require("./api/controllers/register-controller");
var showController = require('./api/controllers/show-register');
var syncData = require('./api/controllers/sync-data');
var infoArduino = require('./api/controllers/info-arduino');
var carRestaurentController = require('./api/controllers/car-restaurent');

var app = express();
var port = process.env.PORT || 5000;

app.use("/assets", express.static(__dirname + "/public"));
app.use("/assets", express.static(path.join(__dirname + '/node_modules/angular-ui-notification/dist')));
app.use("/assets", express.static(path.join(__dirname + '/node_modules/angular')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.set("view engine", "ejs");

// app.locals.flag = flag;

app.use(homeController);
app.use(loginController);
app.use(carRestaurentController);
registerController(app, other_socket);
showController(app);
syncData(io, socket, other_socket);
infoArduino(app, io, socket, other_socket);

// app.get("/", function (req, res) {
//     res.render("index");
// })

app.listen(port, function () {
    console.log("App listening on port: " + port);
})

server.listen(5001, function(){
    console.log("Notify listening on port: " + 5001);
})

other_socket.on('connect', function () {
    console.log("Connect server 2");
});