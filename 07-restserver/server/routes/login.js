const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario-model');
const app = express();

//create request

app.post('/login', (req, res)=> {

    // first getting all information from the body.

    let body = req.body;

   // we use the Schema  of User for comparing if email exists

   Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        // making function for errors 500 Internal Server Error
    if(err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
    if(!usuarioDB){

        return res.status(400).json({
            ok: false,
            err: {
                message: '(Usuario) y contraseña incorrectos'
            }
        });
    }

    if (!bcrypt.compareSync( body.password, usuarioDB.password)){

        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario y (contraseña) incorrectos'
            }
        });
    }
// Generando el Token
    let token = jwt.sign({
        // payload
        usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

     res.json({
         ok: true,
         usuario: usuarioDB,
         token
     });
   });
});


module.exports = app;