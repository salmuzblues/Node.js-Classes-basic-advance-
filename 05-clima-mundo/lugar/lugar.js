const axios = require('axios');


const getPlace = async(direccion) => {

 let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ direccion }&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
   //this is for the status is wrong name
    if (resp.data.status === 'ZERO_RESULTS'){
      throw new Error(`No hay resultados de la dirección indicada ${ direccion }`);
    }

             let location = resp.data.results[0];
             let cordenadas = location.geometry.location;

             let direcLoct = location.formatted_address;
             let cordLat = cordenadas.lat;
             let cordLng = cordenadas.lng;

        // .catch( e => console.log('Error !!!', e))

    return {
     direc: direcLoct,
     lng: cordLng,
     latd: cordLat
    }
};

module.exports = {
  getPlace
};