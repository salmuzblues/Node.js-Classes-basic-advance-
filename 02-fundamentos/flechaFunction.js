// normal function
/*
function Sumar (a, b) {
    return a+b;
}

console.log(Sumar(10,20));
*/
// function reduces with arrow
// sumar name of function, => with this declare is a function, then => "return" a+b;
let sumar = (a,b) => a + b;

console.log(sumar(10,30));

let saludar = () =>  'Hola mundo Juan';

console.log(saludar());
/*
function Saludar (nombre){
    return ` hola ${ nombre}`;
}
*/

let hello = (nombre) => `Hi sr ${nombre}`;
console.log(hello('Juan'));

// create an object
let deadPool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'regeneración',
// include a method
// here we can not use arrow function because this uses this. and this goes directly outside
// only we can do is to take off of name function.
// this. apunta fuera de lo que vale la funcion de fecha.
    getNombre () {
        return `${this.nombre} ${this.apellido} his power is ${this.poder}`
    }
};
console.log(deadPool.getNombre());
