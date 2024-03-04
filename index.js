import * as net from "net";
import { TelnetSocket } from "telnet-stream";

// Some global variable for further use
let socket;
let tSocket;

// Initialize the socket with our IP and port
socket = net.createConnection(23, "batmud.bat.org");

// Connect the socket with telnet
tSocket = new TelnetSocket(socket);
 
// Connect the socket with telnet
tSocket = new TelnetSocket(socket);
 
// If the connection are close "close handler"
tSocket.on("close", function () {
    return process.exit();
});
 
// If the connection are on "on handler"
tSocket.on("data", function (buffer) {
    return process.stdout.write(buffer.toString("utf8"));
});
 
// If the connection are occurred something "doing handler"
tSocket.on("do", function (option) {
    return tSocket.writeWont(option);
});
 
 
tSocket.on("will", function (option) {
    return tSocket.writeDont(option);
});
 
// If the connection are send the data "data handler"
process.stdin.on("data", function (buffer) {
    return tSocket.write(buffer.toString("utf8"));
});