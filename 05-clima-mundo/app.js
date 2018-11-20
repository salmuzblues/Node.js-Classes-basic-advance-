
const { getPlace }   = require('./lugar/lugar.js')
const { argv } = require('./config/yargs-conf');

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

getPlace( argv.direccion )
          .then( resp => {
             console.log(resp);
           }).catch( e => console.log('ERROR!', e));