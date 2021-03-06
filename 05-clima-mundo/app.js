
const { getPlace }   = require('./lugar/lugar.js')
const { argv } = require('./config/yargs-conf');
const { getClima } = require('./clima/clima');

console.log(argv.direccion);

//here is for entering the name of country an city and we will call you by terminal
// by yargs.
/*
The encodeURI() function encodes a Uniform Resource Identifier (URI)
 by replacing each instance of certain characters by one, two, three, or
 four escape sequences representing the UTF-8 encoding of the character
 (will only be four escape sequences for characters composed of two "surrogate" characters).
let encodeUrl = encodeURI(argv.direccion);
*/

// two methods jus one

let getInfo = async (Direccion) => {
   try {
       let coors = await  getPlace(Direccion);
       let temp = await  getClima(coors.lat, coors.lng);

       return `El clima en ${ coors.direc } es de ${ temp } Celsius`;
   }catch (e) {
       return `No se pudo determinar la temperatura de ${ Direccion}`;
   }
};


getInfo(argv.direccion).then (message => {console.log(message)})


                        .catch(e => console.log(e))
/*
this way is more long
getPlace( argv.direccion )
          .then( resp => {
             console.log(resp);
           }).catch( e => console.log('ERROR!', e));


getClima(-12.0463731,  -77.042754).then(temp => console.log(temp))
                                .catch(e => console.log('ERROR!', e)); */