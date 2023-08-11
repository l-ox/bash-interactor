#!/usr/bin/env node
const WebSocket = require('ws'); // Require ws module.
const { spawn } = require('child_process'); // Require spawn module.
const { exec } = require("child_process"); // Require exec module.
const ws = new WebSocket.Server({ port: 8080 }); // Start listening on port 8080.
var text = ''; // Variable to store input from HTML/JS client textbox.

ws.on('connection', (socket) => { // When websocket server receives connection request from client on port 8080, if "event.data" received from client is "foobar", run bash script, and return output to client via websocket.
    console.log('Client connected!');
    socket.onmessage = (event) => {
        if (event.data == "foobar") {
            const ls = spawn("/home/user/myscript.sh");
            ls.stdout.on("data", data => {
                socket.send(`${data}`);
            });
        }
        if (event.data.includes('text: ')) { // If "event.data" received from websocket client contains "text: "...
            text = event.data; // Write "event.data" from client to "text" variable.
            text = text.replace(/^text: /, ''); // Remove prefixed "text: ".
            var text_xform = text.replace(/'/g, "\\'"); // Prevent ' from escaping.
            text = text_xform; // Rewrite newly transformed string back to "text" variable.
            var test_xform = text.replace(/"/g, '\\"'); // Prevent " from escaping.
            text = text_xform; // Rewrite newly transformed string back to "text" variable.
            var text_xform = text.replace(/`/g, '\\`'); // Prevent ` from escaping.
            text = text_xform; // Rewrite newly transformed string back to "text" variable.
            const command = `/home/user/myscript.sh "${text}"`; // Concatenate command to run script with output from "text" value as a variable.
            exec(command, (error, stdout, stderr) => { // Run "command" and send stdout output from the script back to the client via the websocket.
                socket.send(`${stdout}`);
            });
        }
    };
});
