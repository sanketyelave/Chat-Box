
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs')
const path = require('path');

app.use(express.static('public'));


server.listen(3000, () => {
    console.log('listening on *:3000');
});


const users = {}
console.log('server is running well');


io.on('connection', socket => {
    console.log('hello');
    socket.on('New-user-joined', name => {
        users[socket.id] = name;
        console.log(name, socket.id);
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', mess => {
        socket.broadcast.emit('receive', { message: mess, users: users[socket.id] })
    })

    socket.on('image', (data) => {
        const filename = path.join(__dirname, 'uploads', `${Date.now()}.png`);
        fs.readFile(filename, data, 'binary', (err) => {
            if (err) {
                console.error('Error saving image:', err);
            } else {
                console.log('Image saved:', filename);
            }
        });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    })

})

