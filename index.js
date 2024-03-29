import express from 'express';
import net from 'net';
import http from 'http';
import { Server } from 'socket.io';
import { convert } from './server_utils/converter.js';
import { Buffer } from 'buffer';

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
    console.log('an user connected');

    try {
        // connect to batmud
        const mud = net.createConnection(23, "batmud.bat.org");

        // iso-8859-1 aka latin1 is what this mud uses
        mud.setEncoding('latin1');
        connected = true;

        // listens batmud and sends to client
        mud.addListener('data', (data) => {
            // data = data + '\r\n';
            const converted = convert(data);
            //console.log(converted);
            socket.emit('message', createResponse('update', converted));
        });

        // listens client and sends to batmud
        socket.on('command', (data) => {

            // seems that need this, to be executed in batmud
            data = data + '\r\n'; 

            const bufferedData = Buffer.from(data, 'latin1');

            mud.on('end', () => {

                connected = false;

            });
            
            if (connected) {

                mud.write(bufferedData);

            } else {
                console.log('disconnected from mud, not sending');
            }

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