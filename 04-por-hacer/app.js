const argv = require('./config/yargs-conf.js').argv;
const {crear, getlistado, actualizar, borrar} = require('./to-do/to-do.js');
const colors = require('colors/safe');

// create commmand
let comandos = argv._[0];

switch(comandos){

    case 'crear':
        console.log(crear(argv.descripcion));
        break;
    case 'listar':
        let listado = getlistado();
        for (let tarea of listado){
            console.log(colors.green('=====Por Hacer======'));
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log(colors.green('===================='));
        }
        break;
    case 'actualizar':
        let update = actualizar(argv.descripcion, argv.completado);
        console.log(update);
        break;
    case 'borrar':
        let br = borrar(argv.descripcion);
        console.log(br);
        break;
    default:
        console.log('Comando no encontrado');

}