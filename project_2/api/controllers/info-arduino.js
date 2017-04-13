var model = require('../models/car-restaurent');
var SerialPort = require('serialport');
var portName = "/dev/ttyACM0";
var portNameCar = "/dev/ttyUSB0";

module.exports = function (app, io, socket, other_socket) {

    io.sockets.on('connection', function (socket) {
        console.log('Connect arduino');
    });

    // list serial ports:
    var myPort = new SerialPort(portName, {
        baudRate: 9600,
        // look for return and newline at the end of each data packet:
        parser: SerialPort.parsers.readline("\n")
    });

    myPort.on('open', showPortOpen);
    myPort.on('data', sendSerialData);
    myPort.on('close', showPortClose);
    myPort.on('error', showError);

    function showPortOpen() {
        console.log('port open. Data rate: ' + myPort.options.baudRate);
    }

    function sendSerialData(data) {
        io.sockets.emit('message', {notify: 1, data: data});
        other_socket.emit('message', {notify: data, postion: '1', content: 'error', quantity: 2, mess: "send", n: 3}); //send Server 2
        console.log(data);
        model.changeStatusRestaurent(data);
    }

    function showPortClose() {
        console.log('port closed.');
    }

    function showError(error) {
        console.log('Serial port error: ' + error);
    }

}