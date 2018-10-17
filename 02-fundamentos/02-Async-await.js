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
// Async  form getEmpleado
let getEmpleado = async(id) => {

    //find the employee
    let empleadoBD = empleados.find((empleado) => empleado.id === id);
        // create a condition if it exits an employee.
        if(!empleadoBD){
            throw new Error(`this employee does not exist db with this ${id}`);
        }else {
            return empleadoBD;
        }
};

// promise from getSalario
let getSalary = async (empleado) => {
    // find salaryEmple
    let  salaryEmpl = salarios.find((salryEmpl) => salryEmpl.id === empleado.id);
        if(!salaryEmpl){
            throw new Error(`it did not find  the salary for the user ${empleado.name}`);
        }else{
            return  {
                name: empleado.name,
                salario: salaryEmpl.salario,
                id: empleado.id
            }}
};

// retrieve information

let getInformation = async (id) => {

    let empleado = await getEmpleado(id);
    let respSalary = await getSalary(empleado);

    return`${empleado.name} tiene un salario de ${respSalary.salario} con un ID: ${respSalary.id}`;
};

getInformation(2).then(message => console.log(message))
                  .catch(err => console.log(err));


/*
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

  */