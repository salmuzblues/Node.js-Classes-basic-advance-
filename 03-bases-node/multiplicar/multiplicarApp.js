
const fs = require('fs');


let crearArchivo = (base) => {

   return new Promise ((resolve,reject) => {

       if(!Number(base)){
           reject(`Lo introducido ${base} no es un numero`);
           return; // se pone para que ya no continue el codigo.
       }

       let data = '';
       for (let i = 1; i <= 10; i++){

           data +=`${ base } * ${ i } = ${ base * i }\n`;
       }

       fs.writeFile(`tabla-data/tabla-multiplicar${base}.txt`, data, (err) =>{

           if(err)
               reject(err);
           else
               resolve(`tabla-multiplicar${base}.txt`);
       } );
   })
};


//Now we have to export global
 module.exports = {
    crearArchivo
};