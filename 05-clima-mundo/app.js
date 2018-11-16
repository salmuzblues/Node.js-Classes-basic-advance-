const axios = require('axios');

const argv = require('./config/yargs-conf');

console.log();
//here is for entering the name of country an city and we will call you by terminal
// by yargs.
/*
The encodeURI() function encodes a Uniform Resource Identifier (URI)
 by replacing each instance of certain characters by one, two, three, or
 four escape sequences representing the UTF-8 encoding of the character
 (will only be four escape sequences for characters composed of two "surrogate" characters).
 */
let encodeUrl = encodeURI(argv);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
    .then(resp => {

        let location = resp.data.results[0];
        let cordenadas = location.geometry.location;

        console.log('Dirección: ', location.formatted_address);
        console.log('Latitud: ', cordenadas.lat);
        console.log('Longitud: ',cordenadas.lng);
        /*
        console.log(JSON.stringify(resp.data, undefined, 2));
        console.log(resp.status);
        */
    })
    .catch( e => console.log('Error !!!', e));
