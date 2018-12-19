/*
==============
 PUERTO
========
 */
process.env.PORT = process.env.PORT || 3000;

/*
==============
 ENTORNO (Desarrollo o Producción)
=============
 */
// para saber si estoy en desarrollo o en producción
// process.env.NODE_ENV es una variable que establece Heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'dev' ;

/*
==============
BASE DE DATOS
=============
 */

let urlDB;

 if (process.env.NODE_ENV === 'dev'){
     urlDB = 'mongodb://localhost:27017/cafe';
 }else {
    urlDB = 'mongodb://salmuz:Alex032482@ds135594.mlab.com:35594/cafe'
 }

// create a ENV Global
process.env.URLDB = urlDB;

