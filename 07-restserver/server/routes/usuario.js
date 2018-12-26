
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const  _ = require('underscore');
const Usuario = require('../models/usuario-model');
const { verificarToken, verificarAdmin_Role } = require('../middlewares/autenticacion');

//  retrieve  all Users
app.get('/usuario', verificarToken, (req, res) => {

   /* // retrieving all information about usuario o some data.
    return res.json({
    // req.usario viene del verificarToken
       usuario: req.usuario,
       nombre: req.usuario.nombre,
        email: req.usuario.email
    });
*/

    // from what number of users you require to skip
    let desde = req.query.desde - 1 || 0;
    desde = Number(desde);

    // naming a limit of users lists
    let limite = req.query.limite || 5;
    limite = Number(limite);

      Usuario.find({ estado: true })
          .skip(desde) // this for obtain just grups and then skip
          .limit(limite) // how many fields you want
          .exec((err, usuarios) => { // this for executing.

              if (err) {
                  return res.status(400).json({
                      ok: false,
                      err
                  })
              }
              // para el conteo de registros

              Usuario.count({ estado: true }, (err, conteo) => {

                  res.json({
                      ok: true,
                      usuarios,
                      Cantidad: `${conteo} registros`
                  })
              })
          })// End exec
});

// Create Register
app.post('/usuario', [ verificarToken, verificarAdmin_Role ], (req, res) => {
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
app.put('/usuario/:id', [ verificarToken, verificarAdmin_Role ], (req, res) => {
    let id = req.params.id;
    //  with underscore (plugin) we can update some fields those we want.
    let body =  _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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

// delete USER
app.delete('/usuario/:id', [ verificarToken, verificarAdmin_Role ], (req, res) =>{

    let id = req.params.id;
    let changeStatus = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, changeStatus, (err, userStatusFalse) => {

    // this is for something happens
        if (err){
            return res.status(400).json({  // BAD REQUESTE 400
                ok: false,
                err
            });
        }
    // this is results
        res.json({
            ok: true,
            usuario: userStatusFalse
        });

    })

    /*
    Usuario.findByIdAndDelete(id, (err, userDelete) =>{
    // this is for some errors
        if (err){
            return res.status(400).json({  // BAD REQUESTE 400
                ok: false,
                err
            });
        }

    // this is when the user is not in register list
        if (!userDelete){
            return res.status(400).json({  // BAD REQUESTE 400
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
    })// End delete
    */
});



module.exports =  app;
