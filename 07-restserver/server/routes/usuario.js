
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario-model');
// making first direction
app.get('/', (req, res) => res.json('home alex'));
app.get('/usuario', (req, res) => res.json(' Get alex'));

// Create Register
app.post('/usuario', (req, res) => {
    let body = req.body;

    // creating objects :
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // saving all data to mongoDb
    usuario.save((err, usuarioDB) =>{
     if (err){
         return res.status(400).json({  // BAD REQUESTE 400
            ok: false,
            err
         });
     }
     res.json({
         ok: true,
         usuario: usuarioDB
     });
    });
/*
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
    */
});

// modify register
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true },  (err, usuarioDB) => {


        if (err){
            return res.status(400).json({  // BAD REQUESTE 400
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});


app.delete('/usuario', (req, res) => res.json(' delete alex'));

module.exports =  app;
