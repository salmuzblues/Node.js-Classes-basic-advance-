const fs = require('fs');

// create an array just for storing data

let list = [];
// cargarDb data from Json


const crear = (descripcion) =>{
    //append more data to file .json
   cargarDb();
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
const cargarDb = () => {
    try{
        list= require('../db/data.json');

    }catch( error ){
        list = [];
    }
};
const getlistado  = () => {
    cargarDb();
    return list;
};

const actualizar = (descripcion, completado = true) => {
    // first cargarDb
    cargarDb();

    let index = list.findIndex( tarea => tarea.descripcion === descripcion);
    //conditions
    if (index >= 0) {
        list[index].completado = completado;
        guardarDB();
        return true;
    } else {
       return  false;
    }
};
const borrar = (descripcion) => {
  cargarDb();
  //this filter with this !== is going to take away just one of the list.
  let nuevaLista = list.filter(tarea => tarea.descripcion !== descripcion);

  if ( nuevaLista.length === list.length){
      return false;
  }else {
      list = nuevaLista;
      guardarDB();
      return true;
  }
};
module.exports ={
    crear,
    getlistado,
    actualizar,
    borrar
};