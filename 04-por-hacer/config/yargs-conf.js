const opt = {
    descripcion: {
     demand: true,
     alias: 'd',
     desc:'Descripcion por la tarea por hacer'
     }
};
const argv = require('yargs')
                .command('crear', 'crear un elemento',opt)
                .command('actualizar','Actualiza el estado completado de una tarea', {
                    completado:{
                        alias: 'c',
                        default: true,
                        desc:'Marca completado o pendiente la tarea'
                    }
                }).help().argv;


//exports variables
module.exports = {
    argv
};