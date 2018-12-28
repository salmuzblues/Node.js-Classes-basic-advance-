
const express =  require('express');
const app = express();
const Producto = require('../models/producto-model');
const { verificarToken } = require('../middlewares/autenticacion');



/** PETICIONES **/

// Retrieve all productos

app.get('/productos', verificarToken, (req, res)=> {

 let desde = req.query.desde - 1 || 0;
 desde = Number(desde);
 //Limit of category
 let limite = req.query.limite || 5;
 limite = Number(limite);

 Producto.find({ disponible: true })
     .populate('usuario', ' nombre email' )
     .populate('categoria', 'descripcion')
     .skip(desde)
     .limit(limite)
     .exec((err, productosDB) => {
        // for the server
        if (err){
            return res.status(500).json({
              ok: false,
              err
            });
        }

       if(!productosDB){
                return res.status(400).json({
                   ok: false,
                   err: {
                       message: 'No se encontro la lista de Productos'
                   }
                });

       } else {

            res.json({
               ok: true,
               producto: productosDB
            });
       }
     });
});

// RETRIVE A PRODUCT BY ID
app.get('/productos/:id', verificarToken, (req, res)=> {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoBD) => {

            // for the server
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoBD) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No se encontro el id del producto'
                        }
                    });

            }
                res.json({
                    ok: true,
                    producto: productoBD
                });
        });
});
//CREATE PRODUCTOS

app.post('/productos', verificarToken,  (req, res)=>{
//retrieving all data from body
let body = req.body;
//storing all data retrieved.
let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria
});
// saving all data on mongoDB
    producto.save((err, productosBD)=> {
            // for the server
            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if(!productosBD){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
            }
                res.status(201).json({
                    ok: true,
                    producto: productosBD
                });
    });
});

//UPDATE PRODUCT
app.put('/productos/:id', (req, res) => {

    let id = req.params.id;
    let body =  req.body;

    Producto.findById(id, { new: true, runValidators: true }, (err, productosBD)=> {
        // for the server
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
            }

            if (!productosBD) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontro el id'
                    }
                });
            }
            productosBD.nombre = body.nombre;
            productosBD.precioUni = body.precioUni;
            productosBD.categoria = body.categoria;
            productosBD.disponible = body.disponible;
            productosBD.descripcion = body.descripcion;

            //Update to data base
            productosBD.save((err, productoSaved) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    producto: productoSaved
                })
            });
        });
});

// DELETE PRODUCTO
app.delete('/productos/:id', (req, res)=> {
   let id = req.params.id;
   let changeDisp = {
     disponible: false
   };

   Producto.findByIdAndUpdate(id, changeDisp, (err, productoBD)=>{
       // for the server
       if (err) {
           return res.status(500).json({
               ok: false,
               err
           });
       }

       if (!productoBD) {
           return res.status(400).json({
               ok: false,
               err: {
                   message: 'No se encontro el Id del producto'
               }
           });
       }
       res.json({
           ok: true,
           producto: productoBD,
           message: 'Producto ya no disponible'
       });
   });
});

// Look for products

app.get('/productos/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i'); // this converts sensible the searching
   Producto.find({ nombre: regex })
       .populate('categoria', 'descripcion')
       .exec((err, productoDB)=> {
           // for the server
           if (err){
               return res.status(500).json({
                   ok: false,
                   err
               });
           }

           if(!productoDB){
               return res.status(400).json({
                   ok: false,
                   err
               });
           }
           res.json({
               ok: true,
               producto: productoDB
           });
       });


});
module.exports= app;