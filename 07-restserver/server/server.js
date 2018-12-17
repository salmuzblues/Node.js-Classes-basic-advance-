
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// making first direction

app.get('/', (req, res) => res.json(' home alex'));
app.get('/usuario', (req, res) => res.json(' Get alex'));
app.post('/usuario', (req, res) => {

     let body = req.body;

     if (body.name === undefined){
         res.status(400).json({

            ok: false,
            message: 'No a ingreso el nombre'
         });

     }else {
         res.json({
             persona: body
         });
     }

});
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
      id : id
    });
});
app.delete('/usuario', (req, res) => res.json(' delete alex'));
app.listen(3000, () => {
   console.log(`It is running the server on port 3000`);
});