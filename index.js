import express from 'express';
import net from 'net';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 3333;
let connected = false;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('client'));

// Define createResponse function
function createResponse(type, data) {
    return {
        type: type,
        data: data
    };
}

// Handle Socket.IO connection
io.on('connection', (socket) => {
    console.log('a user connected');

    try {
        // connect to batmud
        const mud = net.createConnection(23, "batmud.bat.org");
        mud.setEncoding('latin1');
        connected = true;

        // listens batmud and sends to client
        mud.addListener('data', (data) => {
            socket.emit('message', createResponse('update', data));
        });

        // listens client and sends to batmud
        socket.on('command', (data) => {
            data = data + '\r\n';
            mud.on('end', () => {
                connected = false;
            });
            connected ? mud.write(data) : console.log('disconnected from mud, not sending');
        });
    } catch {
        console.log('error connecting to batmud!');
    }
});

// Serve Socket.IO client library
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

httpServer.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});