const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario-model');
const Producto = require('../models/producto-model');
// File system
const fs = require('fs');
// Path
const path = require('path');
const app = express();

// charging middleware
// default options
//When you upload a file, the file will be accessible from req.files.
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res)=> {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if(!req.files){
        return res.status(400)
            .json({
                ok: false,
                err: {
                     message: 'No se ha cargado los  archivos'
                }
            });
    }
    // Validaciones de tipo
    let valdType = ['productos', 'usuarios'];
    if(valdType.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + valdType.join(', ')
            }
        });
    }

    let data = req.files.data;
    let nombreDataCortado = data.name.split('.');
    /*
    for instance trabajo.doc  this is going to give me this ( [ 'trabajo', 'doc' ] ) 
     */
    //get the last number of our array
    let extensionRequiered= nombreDataCortado[nombreDataCortado.length - 1];
     // extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    //validaciones
    if ( extensionesValidas.indexOf(extensionRequiered) < 0 ){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extensionRequiered
            }
        });
    }

    // change the name of file
    //1234567Abc-102.jpg, Note: new Date().getMilliseconds works as a Random
    let fileNameChange= `${ id }-${ new Date().getMilliseconds() }.${ extensionRequiered }`;


        // here we upload the file into directory
        data.mv(`uploads/${ tipo }/${ fileNameChange }`, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Fallo del servidor'
                    }
                });
            }
        if(tipo === 'usuarios'){
            imagenUsuarios(id, res, fileNameChange);
        }else {
            imagenProductos(id, res, fileNameChange);
        }
        });

});

function imagenUsuarios (id, res, fileNameChange){

    Usuario.findById( id, (err, usuarioBD) => {
      if(err) {
          borraFile(fileNameChange, 'usuarios');
          return res.status(500).json({
              ok: false,
              err
          });
      }
        if(!usuarioBD){
          // if id does not exit  just deleting
            borraFile(fileNameChange, 'usuarios');
            return res.status(400).json({
                ok:false,
                err:{
                    message: ' No existe el Usuario'
                }
            });
        }

        borraFile(usuarioBD.img, 'usuarios');

    // retrieve the new fileNameChange
    usuarioBD.img = fileNameChange;
    // storing to BD
    usuarioBD.save((err, userSaved) => {
        res.json({
            ok: true,
            usuario: userSaved,
            img: fileNameChange,
            message: 'La imagen  se cargo'
        });
    });
    });
}// End Fuction imagenUsuarios

function imagenProductos(id, res, imgName){

  Producto.findById(id, (err, productoDB)=> {

      // first errors for the serve
      if (err){
          borraFile(imgName, 'productos');
          return res.status(500).json({
              ok: false,
              err
          });
      }
      // if product exits
      if (!productoDB){
          borraFile(imgName, 'productos');
          return res.status(400).json({
             ok: false,
             err: {
                 message: 'No existe el id del producto'
             }
          });
      }
      // delete file existing
      borraFile(productoDB.img, 'productos');

      productoDB.img = imgName;
      // save to mongo
      productoDB.save((err, productSaved) => {
          if(err){
              return res.status(500).json({
                 ok: false,
                 err
              });
          }// end if
          res.json({
              ok: true,
              producto: productSaved,
              img: imgName,
              message: ' Se cargo la imagen correctamente! '
          });
      });
  });// End findById

}// End  function imagenProductos

function borraFile (nombreImagen, tipo) {
    // fs and path, delete the existing path
    //The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    // confirm if it exits the image, this method existsSync will return a true if it exits or false otherwise
    if ( fs.existsSync(pathImagen)){
        // we are going to delete the file
        fs.unlinkSync(pathImagen);
    }
}

module.exports= app;