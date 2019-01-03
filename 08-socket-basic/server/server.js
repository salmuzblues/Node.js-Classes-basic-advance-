const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');  // nos permite levantar un servidor.
const app = express();
// montar el servidor, con todas las configuraciones que le podamos hacer al express del app.
let server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
// create this link for sharing all people and they can get access it
app.use(express.static(publicPath));
// keep working with a communication forward backend.
module.exports.io = socketIO(server);

require('./sockets/socket');
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

