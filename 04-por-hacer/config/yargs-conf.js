
const argv = require('yargs')
                .command('crear', 'crear un elemento', {descripcion: {
                     demand: true,
                         alias: 'd',
                    desc:'Descripcion por la tarea por hacer'
                    }})
                .command('actualizar','Actualiza el estado completado de una tarea', {
                    descripcion: {
                        demand: true,
                        alias: 'd',
                        desc:'Descripcion por la tarea por hacer'},
                    completado:{
                        alias: 'c',
                        default: true,
                        desc:'Marca completado o pendiente la tarea'
                    }
                }).command('borrar', 'borra una tarea', {
                    descripcion: {
                     demand: true,
                     alias: 'd',
                     desc: 'Descripcion por la tarea por hacer'
                 }
                }).help().argv;

//exports variables
module.exports = {
    argv
};