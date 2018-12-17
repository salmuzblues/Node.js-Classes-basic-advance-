const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT  || 3000;
// importando los metodos helper para que funcionen en este file.js
require('./hbs/helpers');

// middleware es una instrucción o callback que se va a ejecutar siempre que url pida
app.use(express.static( __dirname  + '/public'));

// exspress HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// go to Home
app.get('/', function (req, res) {

    res.render('Home', {
        nombre: 'Juan',
    });
});
    app.get('/about', function (req, res) {

        res.render('about');
    });


  /*
   // res.send('Hello world');
    let salida = {
        nombre: 'Alex',
        edad: 36,
        url: req.url
    };

    res.send(salida);
    */

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto numero ${ port }`);
});