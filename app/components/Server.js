import io from 'socket.io-client';

var serverConfig1 = {
    host: "localhost",
    port: "7000"
}

var serverConfig2 = {
    host: "128.88.242.23",
    port: "7000"
}

var serverConfig = serverConfig2;

var socket = io.connect('http://' + serverConfig.host + ':' + serverConfig.port, {reconnect: true});

module.exports = {
    socket: socket
}