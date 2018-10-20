const argv = require('./config/yargs-conf.js').argv;
const {crear} = require('./to-do/to-do.js');

// create commmand
let comandos = argv._[0];

switch(comandos){

    case 'crear':
        console.log(crear(argv.descripcion));
        break;
    case 'listar':
        console.log('crear listar');
        break;
    case 'actualizar':
        console.log('crear file');
        break;
    default:
        console.log('Comando no encontrado');

}