
var socket = io();
socket.on('connect', function(){
    console.log('Conectado al servidor');
});
// cuando trabajas con .on() son para escuchar informacion del servidor
socket.on('disconnect', function () {
    console.log('Perdimos conección con el servidor');
});
// con .emit() son para enviar información al servidor
socket.emit('enviarMensaje', {
    usuario: 'Juan Carranza',
    message: 'Hello World'
}, function (resp) {
    console.log('Respuesta del servidor: ', resp);
});
// escuchando información desde el servidor emitiendo.
socket.on('enviarMensaje', (message) => {
    console.log('Servidor: ', message);
});