/*
==============
 PUERTO
========
 */
process.env.PORT = process.env.PORT || 3000;

/*
======================
VENCIMIENTO DEL TOKEN
======================
60 SEGUNDOS *
60 MINUTOS *
24 HORAS *
30 DIAS
 */
process.env.CADUCIDAD_TOKEN = '48h';
/*
======================
SEED DE AUTENTICACION
======================
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/*
==============
Google Client ID
=============
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '673317804421-u5am3kpne3q55jse3o208bonvmdh0lgh.apps.googleusercontent.com';
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
    urlDB = process.env.MONGO_URI;
 }

// create a ENV Global
process.env.URLDB = urlDB;

