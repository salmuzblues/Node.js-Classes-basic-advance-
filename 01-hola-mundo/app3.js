
// working how works non-blocking

console.log('Inicio del programa');
//create class setTimeout

setTimeout(function () {
  console.log('First Time Out')
},3000);

setTimeout(function () {
    console.log('Two Time Out')
},0);

setTimeout(function () {
    console.log('Third Time Out')
},0);

console.log('Finish program')