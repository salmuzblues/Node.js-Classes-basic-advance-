
const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite:{
        alias: 'l',
        default: 10
    }
};
const argv = require('yargs')
    .command('listar', 'print by console  a table o multiply', opts)
    .command('crear', 'create file txt about tables of multiply', opts)
    .help()
    .argv;

module.exports ={
   argv
};