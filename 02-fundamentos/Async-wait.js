/*
let getName = async()=> {
  // create an error
  //  undefined.nombre;
  //throw  new Error('this is a error ')
  return 'JUAN';
};
*/
// this fuction is the same to above
let getName = () => {
  return new Promise( (resolve, reject) =>{
    //method time out
      setTimeout(() =>{
          resolve('JUAN');
      }, 3000);
  });

};
//using async and await to retrieve a promise

let saludo = async () => {
      // if await it does not response it would stay here forever.
      let nombre = await getName();

      return `Hola ${nombre}`;
};
//calling  saludo
saludo().then(mensaje => {
    console.log(mensaje);
}).catch(error => {
    console.log('ERROR de Async',error);
});

/*
getName().then( nombre => {
    console.log(nombre);
  }).catch(error => {
    console.log('ERROR de Async',error);
      });
*/