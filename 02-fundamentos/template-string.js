
let nombre = 'batman';
let real  = 'Juan';
/*
console.log(nombre + ' ' + real);
//this  is a template
console.log(`${nombre} ${real}`); // inside of this ${} we can add javascript code.
// compare two sentences if they are both the same.
let nombreCompleto = nombre + ' ' + real;
let nombreTemplate = `${nombre} ${real}`;
console.log(nombreCompleto === nombreTemplate); // sintacticament son los mismos tanto como en espacios
*/

function getNombre() {
    return `${nombre} ${real}`;
}

console.log(` his real name is ${getNombre()}`);