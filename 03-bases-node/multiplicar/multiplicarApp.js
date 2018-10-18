
const fs = require('fs');

let listarTabla = (base, limite) => {
    return new Promise((resolve, reject) =>{
       let data = '';
       for (let i = 1; i <= limite; i++){
           data += `${ base } * ${ i } = ${ base * i }\n`;
       }
       if(!data)
           reject('It does not contain data');
       else
           resolve(data);
    });
};


let crearArchivo = (base, limite = 10) => {

   return new Promise ((resolve,reject) => {

       if(!Number(base)){
           reject(`Lo introducido ${base} no es un numero`);
           return; // se pone para que ya no continue el codigo.
       }

       let data = '';
       for (let i = 1; i <= limite; i++){

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
    crearArchivo,
     listarTabla
};