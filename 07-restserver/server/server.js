require('./config/config.js');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//import all about User.
app.use(require('./routes/usuario'));

//this for recognize if we use local o web URL
app.listen(process.env.PORT, () => {
   console.log(`It is running the server on port ${ process.env.PORT }`);
});
// Conexion to data base
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err)
        throw err;
    else
        console.log('Base de datos ONLINE');
});