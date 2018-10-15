/*
setTimeout(() => {
   console.log("HI JUAN ");
},3000);
*/
//create a method
let getUsuarioById =( id, callback) => {

    // create a little DB
    let user = {
        name: 'Juan',
        id : id
    };
  /*
    // call the function callback;
    callback(user); */
  //what happens if the ID does not exit
    if (id === 20){
        callback(`this ${id} user does not exit on BD `);
    }else{
   // this action is correct, but our callback has err parameter so we need to add a null
        callback(null, user);
    }

}

//call a method getUsuarioById

getUsuarioById(1, (err, user) => {
   if(err){
        return console.log(err);
    }
    console.log('this user exits on base data ', user);
});