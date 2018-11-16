const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad a obtener del clima',
        demand: true
        }
}).help().argv;


module.exports = {
  argv
};