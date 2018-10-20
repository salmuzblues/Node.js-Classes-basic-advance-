const fs = require('fs');

// create an array just for storing data

let list = [];

const crear = (descripcion) =>{
  // create an object to store
  let toDo = {
      descripcion,
      completado: false
  }
// then  all data store into array
    list.push(toDo);
        guardarDB();
  // return jus for feedback about data
    return toDo;
};
const guardarDB = () =>{
  let data = JSON.stringify(list);
  fs.writeFile('db/data.json',data, (e) =>{
      if(e) throw new Error('No se pudo grabar', e);
  });

};
module.exports ={
  crear,

};