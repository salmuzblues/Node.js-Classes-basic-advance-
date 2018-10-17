// calling method.
const { crearArchivo } = require('./multiplicar/multiplicarApp.js');

let base = 'abc';

// retrieve  a promise
// if I want just to use the entire name of the method, no to call by name constan like this
// multiplicar.crearArchivo, we need to destructurar
 crearArchivo(base).then(archivo => console.log(`Archivo creado ${archivo}`))
                    .catch(e => console.log(e));