const express = require('express');
const app = express();

// middleware es una instrucción o callback que se va a ejecutar siempre que url pida
app.use(express.static( __dirname  + '/public'));

/*
app.get('/', function (req, res) {
   // res.send('Hello world');
    let salida = {
        nombre: 'Alex',
        edad: 36,
        url: req.url
    };

    res.send(salida);
}); */
app.listen(3000, () => {
    console.log('Escichando peticiones en el puerto numero 3000');
});