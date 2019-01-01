const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { verificaTokenImg } = require('../middlewares/autenticacion')
// Retrieving the imge of users // products with a petition
app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    // create path absolut
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    // conditions if the Image exits
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        let pathNoImage = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoImage);
    }
});












module.exports = app;