
// MAKING A SERVER BY HTTP

const http = require('http');

http.createServer((req, resp) => {
    // this is way is for JSON
    resp.writeHead(200, { 'Content-Type': 'application/json'});
    let salida = {
       nombre: 'Alex',
       edad: 36,
        url: req.url
    };
     resp.write( JSON.stringify(salida) );
  //  resp.write('hello world ');
    resp.end();
})
 .listen(8080);

console.log('listening to port');