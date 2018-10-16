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
//create a method Get empleado for id

let getEmpleado = (id, callback) => {
    //find the employee
    let empleadoBD = empleados.find((empleado) => empleado.id === id);
   // create a condition if it exits an employee.
    if(!empleadoBD){
        callback(`this employee does not exist db with this ${id}`);
    }else {
        callback(null, empleadoBD);
    }
};
/*
// getSalario for empleado Method

let getSalario = (namEmpleado, callback) => {

    let nameEmplyeeBD = empleados.find((empleado) => empleado.name === namEmpleado);
    if(!nameEmplyeeBD){
        callback(`it did not find  the salary for the user ${namEmpleado}`);

    }else{
        let empleSalary = salarios.find((empSalary) => empSalary.id === nameEmplyeeBD.id);
        callback(null, empleSalary, nameEmplyeeBD);
    }
}



// trigger method
  getSalario('Juan', (err,employeeSala, nameEmpl) => {
      if (err){
           return console.log(err);
      }
      console.log(nameEmpl, employeeSala);
  });
*/

let getSalary = (empleado, callback) => {

    let  salaryEmpl = salarios.find((salryEmpl) => salryEmpl.id === empleado.id);
    if(!salaryEmpl){
        callback(`it did not find  the salary for the user ${empleado.name}`);
    }else{
        callback(null, {
            name: empleado.name,
            salario: salaryEmpl.salario,
            id: empleado.id
        })
    }
};
getEmpleado(3, (err, empleado) => {
     if(err){
        return  console.log(err);
     }
    getSalary(empleado, (err, resp) => {
        if(err){
            return  console.log(err);
        }

        console.log(`El salario de ${resp.name} es de ${resp.salario} con el ID: ${resp.id}`);
    })
 });