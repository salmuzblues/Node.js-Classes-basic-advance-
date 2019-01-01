
const jwt = require('jsonwebtoken');
/*
=================================
VERIFICAR TOKEN
================================

req = petición que quiero realizar,
res =  la respuesta  que quiero retornar.
next = para que siga continuando el resto de la función
 */

let verificarToken = ( req, res, next ) => {
// retrieving token from the header of our page.
    let token  =  req.get('token'); // if you write Authorization so write it instead of 'token'
    // verificando el autenticación.

    jwt.verify( token, process.env.SEED, (err, decoded) => {
    // catching errors
        if(err){
            return res.status(401).json({ // Unauthorized
            ok: false,
            err: {
            message: 'Token invalido'}
             });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
/*
=================================
VERIFICAR  ADMIN_ROLE
================================

req = petición que quiero realizar,
res =  la respuesta  que quiero retornar.
next = para que siga continuando el resto de la función
 */
let verificarAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE'){
        next();
    } else{
      return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};
/*
==================================
VERIFICAR  TOKEN IMAGE
==================================
 */
let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;

    jwt.verify( token, process.env.SEED, (err, decoded) => {
        // catching errors
        if(err){
            return res.status(401).json({ // Unauthorized
                ok: false,
                err: {
                    message: 'Token invalido'}
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificarToken,
    verificarAdmin_Role,
    verificaTokenImg
};