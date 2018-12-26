const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario-model');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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

// Configuración de Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
   // const userid = payload['sub'];
  return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
  }
}


app.post('/google', async(req, res) => {

    let token = req.body.idtoken;
    // realizamos un catch para ver si hay un error o para ver si el token es original o si el google user es el correcto
    let googgleUser =  await verify(token)
        .catch( e => {
            return res.status(403).json({ // FORBIDDEN Serve refuse to give you a file, authentication won't help.
               err: e
            });
        });

    Usuario.findOne( { email: googgleUser.email }, ( err, usuarioDB ) => {

        // making function for errors 500 Internal Server Error
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

    if (usuarioDB) {  // si existe el usuario
        if (usuarioDB.google === false) {  // y no se autenticado por google
            return res.status(400).json({ // Bad request
                ok: false,
                err: {
                    message: 'Debe usar su autenticación normal'
                }
            })
        } else {
            // Generando el Token
            let token = jwt.sign({
                // payload
                usuario: usuarioDB
            }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        }
    } else {
            let usuario = new Usuario();

            usuario.nombre = googgleUser.name;
            usuario.email = googgleUser.email;
            usuario.img = googgleUser.img;
            usuario.google = true;
            usuario.password = ':)'; // esto solo es para pasar la vaidaciónde  la base de datos.
        // SAVING DATA
        usuario.save((err, usuarioDB) => {
            // internal error 500

            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            // Generando el Token
            let token = jwt.sign({
                // payload
                usuario: usuarioDB
            }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });

        });

    }
    });

});


module.exports = app;