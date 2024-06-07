import express from 'express';
import net from 'net';
import http from 'http';
import { Server } from 'socket.io';
import { convert } from './server_utils/converter.js';
import { Buffer } from 'buffer';

const app = express();
const port = 3333;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",  // allow requests from any origin
        methods: ["GET", "POST"]
    }
});

app.use(express.static('client'));

function createResponse(type, data) {
    return {
        type: type,
        data: data
    };
}

io.on('connection', (socket) => {
    console.log('A user connected');

    const mud = net.createConnection(23, "batmud.bat.org", () => {
        console.log('Connected to BatMUD');
    });

    mud.setEncoding('latin1');

    mud.on('data', (data) => {
        const converted = convert(data);
        socket.emit('message', createResponse('update', converted));
    });

    mud.on('end', () => {
        console.log('Disconnected from BatMUD');
        socket.emit('message', createResponse('disconnect', 'Disconnected from BatMUD'));
    });

    mud.on('error', (err) => {
        console.error('Error:', err.message);
        socket.emit('message', createResponse('error', 'Error connecting to BatMUD'));
    });

    socket.on('command', (data) => {
        if (mud.destroyed) {
            console.log('Not connected to BatMUD, command not sent');
            return;
        }
        
        const bufferedData = Buffer.from(data + '\r\n', 'latin1');
        mud.write(bufferedData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        if (!mud.destroyed) {
            mud.end();
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});