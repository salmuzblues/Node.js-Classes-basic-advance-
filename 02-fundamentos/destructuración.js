// create an object
let deadPool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'regeneración',
// include a method
    getNombre: function () {
        return `${this.nombre} ${this.apellido} his power is ${this.poder}`
    }
};

// two ways to retrieve values form the object deadPool
//first long code
/*
let nombre = deadPool.nombre;
let apellido = deadPool.apellido;
let power = deadPool.poder;
console.log(`${nombre} ${apellido} ${power}`);
*/
// just one code. but if you want to change the variable nombre to primerNombre
let {nombre: primerNombre, apellido, poder} = deadPool;
console.log(`${primerNombre} ${apellido} ${poder}`);
