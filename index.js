import express from 'express';
import net from 'net';
import http from 'http';
import { Server } from 'socket.io';
import { convert } from './server_utils/converter.js';
import { Buffer } from 'buffer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3333;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5555"],  // allow requests from React app
        methods: ["GET", "POST"]
    }
});

// Serve the selection page
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files from vanillaClient directory
app.use('/vanillaClient', express.static(path.join(__dirname, 'vanillaClient')));

// Serve static files from the 'reactClient' directory
app.use('/reactClient', express.static(path.join(__dirname, 'reactClient')));

function createResponse(type, data) {
    return {
        type: type,
        data: data
    };
}

io.on('connection', (socket) => {
    console.log('A user connected');

    let mud = null;
    let connecting = false;

    const connectToMud = () => {
        return new Promise((resolve, reject) => {
            if (connecting || mud) {
                resolve();
                return;
            }

            connecting = true;
            mud = net.createConnection(23, "batmud.bat.org", () => {
                console.log('Connected to BatMUD');
                connecting = false;
                resolve();
            });

            mud.setEncoding('latin1');

            mud.on('data', (data) => {
                //console.log('raw data: ', data);
                const converted = convert(data);
                //console.log('converted: ', converted);
                socket.emit('message', createResponse('update', converted));
            });

            mud.on('end', () => {
                console.log('Disconnected from BatMUD');
                socket.emit('message', createResponse('disconnect', 'Disconnected from BatMUD'));
                mud = null;
            });

            mud.on('error', (err) => {
                console.error('Error:', err.message);
                socket.emit('message', createResponse('error', 'Error connecting to BatMUD'));
                mud = null;
                connecting = false;
                reject(err);
            });
        });
    };

    connectToMud().catch(err => console.error('Initial connection error:', err));

    socket.on('command', async (data) => {
        if (!mud || mud.destroyed) {
            try {
                await connectToMud();
            } catch (err) {
                console.error('Reconnection error:', err);
                return;
            }
        }

        const bufferedData = Buffer.from(data + '\r\n', 'latin1');
        mud.write(bufferedData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        if (mud && !mud.destroyed) {
            mud.end();
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});