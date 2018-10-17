//create a mini BD
let empleados = [{
    id:1,
    name: 'Juan'
},{
    id:2,
    name: 'Maria'
},{
    id:3,
    name: 'Vanesa'
}];

let salarios = [{
    id:1,
    salario: 4000
},{
    id:2,
    salario: 5000
}];
// promise form getEmpleado
let getEmpleado = (id) => {
    //return a promise and inside the Promises has tw callbacks
    return new Promise((resolve,reject) => {
        //find the employee
        let empleadoBD = empleados.find((empleado) => empleado.id === id);
        // create a condition if it exits an employee.
        if(!empleadoBD){
            reject(`this employee does not exist db with this ${id}`);
        }else {
            resolve(empleadoBD);
        }
    });
};

 // promise from getSalario
let getSalary = (empleado) => {

    return new Promise((resolve, reject) => {

        let  salaryEmpl = salarios.find((salryEmpl) => salryEmpl.id === empleado.id);
        if(!salaryEmpl){
            reject(`it did not find  the salary for the user ${empleado.name}`);
        }else{
            resolve ({
                name: empleado.name,
                salario: salaryEmpl.salario,
                id: empleado.id
            })}
        });
};

// ****then is for calling our object from the promise ****
/*
getEmpleado(10).then(empleado => {
    // console.log(`El empleado de la BD es`, empleado );
    getSalary(empleado).then((resp) => {
        console.log(`El nombre del empleado es ${resp.name} con un salario de ${resp.salario} y el ID: ${resp.id}`);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});
*/

// **  Promises with chain
getEmpleado(3).then(empleado => {
   return getSalary(empleado);
})
    .then(resp => {
    console.log(`El usuario ${resp.name} tiene un salario ${resp.salario} con un ID: ${resp.id}`);
})
    // this catch is catching two errs from getEmpleado and getSalary 
    .catch(err =>{
        console.log(err);
    });