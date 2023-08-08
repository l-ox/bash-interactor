#!/usr/bin/env node
const WebSocket = require('ws');
const { spawn } = require('child_process');
const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (socket) => {
    console.log('Client connected!');
    socket.onmessage = (event) => {
        if (event.data == "<string from client>") {
            const ls = spawn("<Bash command or path bash script>");
            ls.stdout.on("data", data => {
                console.log(`${data}`);
                socket.send(`${data}`);
            });
        }
    };
});
