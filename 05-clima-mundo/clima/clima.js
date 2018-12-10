
const axios = require('axios');

// create a method
 const getClima = async(lat, lng) => {
     let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&units=metric&appid=1aed231ffc36f489dae612d08b868aac`);
    if (resp.data.cod === '400' )
        throw new Error(`Datos no encontrados  de ${lat}  y ${lng} `);

    return resp.data.main.temp;


 };

module.exports = {
    getClima
};