
const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado');
    client.emit('enviarMensaje', {
        user: 'Administrador',
        message: 'Bienvenido a esta aplicación'
    });
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    //escuchar desde el cliente
    client.on('enviarMensaje', (data, callback ) => {
          console.log(data);

          client.broadcast.emit('enviarMensaje', data);
        // if (message.usuario){
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });
        // }else {
        //     callback({
        //         resp: 'Todo salio MAL!!!!'
        //     })
        // }

    });
});