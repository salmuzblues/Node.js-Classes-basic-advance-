// diferencies about let and var

/*
  var is a variable for global declaration and let jus works one scope. inside of method
 */

/* var  nombre  = 'Juan';

if(nombre)
    var nombre = 'Richard';

*/
// you need to compare with var and let, let acts different, depending its scope.  
let i = 'hola alex';
for (let i=0 ; i <= 5; i ++){

    console.log(`Values of i: ${ i }`);
}
console.log(i);


