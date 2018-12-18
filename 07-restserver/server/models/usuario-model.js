
// calling mongoose
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
   values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un roll valido'
};


let usuarioSchema = new Schema({

    nombre:{
       type: String,
       required:[ true , 'El nombre es necesario']
   },
    email: {
       type: String,
        unique: true,
       required:[ true, 'el email es necesario']
    },
    password: {
       type: String,
        required: [ true, 'Su contraseña es necesaria']
    },
    img:{
        type: String,
        required: false
    },
    role:{
       type:String,
        default: 'USER_ROLE',
        // validación de ROLE just accepting USER_ROLE and ADMIN_ROLE.
        // first to make a array just accepting of vaildations ROLES.
        enum: rolesValidos
    },
    estado:{
       type: Boolean,
        default:true
    },
    google:{
       type: Boolean,
        default: false
    }
});

// para no mostrar un campo en la respuesta.
// modificando el esquema toJson
usuarioSchema.methods.toJSON = function () {
  let user = this;   // lo que sea que tenga en ese momento el This.
    // vamos a tomar el objeto del usuario.
    let userObject = user.toObject(); // aquí se obtiene todas las propiedades y metodos.
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH}, debee ser unico'});

module.exports =  mongoose.model('Usuario', usuarioSchema);