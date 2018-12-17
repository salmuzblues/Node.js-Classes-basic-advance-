const hbs = require('hbs');

// this method for using years automatically
hbs.registerHelper('getAnio', () => {
    return  new Date().getFullYear();
});
// this mehod for captilize de first letter
hbs.registerHelper('capitalize', (text) => {
    let palabras = text.split(' ');

    palabras.forEach((palabra, idx) =>{
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    // adjunta de nuevo las palabras con el espacio
    return palabras.join(' ');
});
