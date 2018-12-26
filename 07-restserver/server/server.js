require('./config/config.js');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//configuración global de rutas
app.use(require('./routes/index'));

//available  for directory public
app.use(express.static( path.resolve(__dirname, '../public')));

/*
esto es para poder resolver la ruta correcta
console.log(path.resolve(__dirname, '../public'));
*/
//this for recognize if we use local o web URL
app.listen(process.env.PORT, () => {
   console.log(`It is running the server on port ${ process.env.PORT }`);
});
// Conexion to data base
mongoose.connect(process.env.URLDB, { useNewUrlParser: true ,  useCreateIndex: true,}, (err, res) => {
    if (err)
        throw err;
    else
        console.log('Base de datos ONLINE');
});