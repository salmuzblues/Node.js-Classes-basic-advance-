
const express = require('express');
const app = express();
const Categoria = require('../models/categoria-model');
const { verificarToken, verificarAdmin_Role } = require('../middlewares/autenticacion');

/// CREATING SERVICES

// List of categorias

app.get('/categoria', verificarToken, (req, res)=> {

// making from what categoria you want.

    let desde = req.query.desde -1 || 0;
    desde = Number(desde);
// naming a limit of category
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, categorias) => {
            // 400 Bad request
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El servidor no encontro la lista especificada'
                    }
                });
            }
          // conteo de categorias
          Categoria.count((err, conteo) => {
       res.json({
           ok: true,
           categorias,
           Cantidad: `${conteo} categorias`
       })});
        })// End exec
});

// Show  just one  categoria

app.get('/categoria/:id', verificarToken, (req, res)=> {

    // getting the id from the page
    let id = req.params.id;
    let body = req.body;
    Categoria.findById( id, body, { new: true, runValidators: true }, (err, categoriaBD) => {
        // first a error if it could happen for server
        if (err){
            return res.status(500).json({ // internar server Error
                ok:false,
                err
            });
        }
        // bad Request 400
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
           ok: true,
           categoria: categoriaBD
        });
    });
});

// Create a new category
app.post('/categoria', verificarToken, (req, res) => {
    // retrieving all data from body
    let body = req.body;
    //storing all data retrieved.
    let categoria = new Categoria({
       descripcion: body.descripcion,
           usuario: req.usuario._id
    });

    // saving all data on mongoDB
    categoria.save((err, categoriaDB) => {
        // first a error if it could happen for server
        if (err){
            return res.status(500).json({ // internar server Error
               ok:false,
               err
            });
            }
       /// for bad request
       if (!categoriaDB){
           return res.status(400).json({ // Bad request
               ok:false,
               err
           });
       }else {
           // show all results
           res.json({
               ok: true,
               categoria: categoriaDB
           })
       }
    });
});

// Modify a category

app.put('/categoria/:id', verificarToken, (req, res)=> {

    let id = req.params.id;
    let body= req.body;

    let descCategoria = {
    descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, ( err, categoriDB)=>{

        // first a error if it could happen for server
        if (err){
            return res.status(500).json({ // internar server Error
                ok:false,
                err
            });
        }

       if (!categoriDB) {
           // error for bad request
           if (err) {
               return res.status(400).json({
                   ok: false,
                   err
               })
           }
       }
        res.json({
           ok: true,
           categoria: categoriDB
        });
    });
});

// DELETE Category

app.delete('/categoria/:id', [ verificarToken, verificarAdmin_Role ], (req, res)=> {

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, deleteCategoryBD)=>{
        // first a error if it could happen for server
        if (err){
            return res.status(500).json({ // internar server Error
                ok:false,
                err
            });
        }

        if (!deleteCategoryBD) {
            // error for bad request
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no existe'
                    }
                })
            }
        }

      res.json({
          ok:true,
          message: 'Eliminado la categoria'
      })
    });
});


module.exports= app;