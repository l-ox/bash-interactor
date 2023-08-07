const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8443 });

wss.on('connection', (ws) => {
    console.log('Client connected successfully!');

    const logFileStream = fs.createReadStream('/var/log/compliance_fetch.log', { encoding: 'utf8' });

    logFileStream.on('data', (data) => {
        ws.send(data);
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
        logFileStream.destroy();
    });
});
