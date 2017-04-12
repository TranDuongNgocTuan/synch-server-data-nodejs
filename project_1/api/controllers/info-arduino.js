
var SerialPort = require('serialport');
var portName = "/dev/ttyUSB0";

module.exports = function (app, io, socket, other_socket) {

    io.sockets.on('connection', function (socket) {
        console.log('Connect client');
        // socket.on('arduino', function(data){
        //     socket.emit('message', data);
        // })
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
        io.sockets.emit('message', data);
        other_socket.emit('message', {notify: data, postion: '1', content: 'error', quantity: 2, mess: "send", n: 3}); //send Server 2
        console.log(data);
    }

    function showPortClose() {
        console.log('port closed.');
    }

    function showError(error) {
        console.log('Serial port error: ' + error);
    }

}