// calling method.
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicarApp.js');
const argv = require('./config/yargs-config.js').argv;
const colors = require('colors/safe');

//console.log(argv);

let comando = argv._[0]; //listar es el indice 0{ _: [ 'listar' ], base: 3, b: 3, limite: 3, l: 3, '$0': 'app' }

switch (comando){

    case 'listar':
        listarTabla(argv.base, argv.limite).then(archivo => console.log(`Tabla del ${argv.base}\n`))
            .catch(e => console.log(e));
     break;
    case 'crear':
        crearArchivo(argv.base, argv.limite).then(archivo => console.log(`Archivo creado: `, colors.green(archivo)))
            .catch(e => console.log(e));
        break;
    default:
     console.log('it is not a command');
}
//let base = 'abc';
// console.log(process.argv);
// this code is for giving data for terminal

//let argv2 = process.argv;

 //   console.log('Base: ', argv.base);
 //   console.log('Limite: ',argv.limite);
 //   console.log(argv2);
/*
let parametro = argv[2];// split is for changing String to array the argument is base=5 then the result is
                        //[ base, 5]
let base = parametro.split('=')[1];
*
/*
NOTA IMPORTANTE : when you want to send values if you write like this hasta=20, hence it would
work the same because that only would care it is value 20, so it would create the table X 20.
or you write whatever it is the same. becareful
 */
// retrieve  a promise
// if I want just to use the entire name of the method, no to call by name constan like this
// multiplicar.crearArchivo, we need to destructurar
//crearArchivo(base).then(archivo => console.log(`Archivo creado ${archivo}`))
//    .catch(e => console.log(e));