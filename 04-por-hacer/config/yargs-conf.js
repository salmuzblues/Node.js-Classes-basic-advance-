const descripcion = {
    demand: true,
    alias: 'd',
    desc:'Descripcion por la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc:'Marca completado o pendiente la tarea'
};
const argv = require('yargs')
                .command('crear', 'crear un elemento', {
                    descripcion
                    })
                .command('actualizar','Actualiza el estado completado de una tarea', {
                    descripcion,
                    completado
                }).command('borrar', 'borra una tarea', {
                    descripcion
                }).help().argv;

//exports variables
module.exports = {
    argv
};