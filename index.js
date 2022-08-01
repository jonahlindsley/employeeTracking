
const inquirer = require('inquirer');
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    database: 'employee_tracking',
    user: 'root',
    password: 'pass'
})
async function employees() {
    const results = await db.query(`SELECT * FROM employees;`);
    console.table(results[0]);
}
function viewAllEmployees(data) {
      
    employees()
    .then(main)
};
// const employees = db.query('SELECT * FROM employees')

async function roles() {
    const results = await db.query(`SELECT * FROM roles;`);
    console.table(results[0]);
}
const role =  db.query(`SELECT * FROM roles;`);

async function viewAllDepartments() {
    const results = await db.query(`SELECT * FROM department;`)
    console.table(results[0])
}
async function viewAllDepartments() {
    const results = await db.query(`SELECT * FROM department;`)
    console.table(results[0])
}
function departments(){
    viewAllDepartments()
    .then(main)
   
}
async function managerList() {
    const results = await db.query(`SELECT first_name FROM employees WHERE manager_id = none;`);
    console.table(results[0]);
}
// get all departments, then in the prompt we show them all the departments as a list then they can select the one that tthey ewant to add a new role to when they select it i can grab the id of the selected department
let managers = [managerList, 'none']

async function department() {
    const results = await db.query(`SELECT * FROM department;`)}
console.log(department)
const main = async () => {
    const main = await inquirer.prompt(
        [{
            type: 'list',
            name: 'next',
            message: 'WHAT WOULD YOU LIKE TO DO?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
        }]).then((data) => {
            if (data.next === 'View All Employees') {
                viewAllEmployees()
            } else if (data.next === 'View All Roles') {
                roles()
            } else if (data.next === 'View All Departments') {
                departments()
            } else if (data.next === 'Add Department') {
                addDepartment()
            } else if (data.next === 'Add Employee') {
                addEmployee()
            } else if (data.next === 'Add Role') {
                addRole()
            } else if (data.next === 'Update Employee Role') {
                UpdateEmployeeRole()
            }
        })
}
// SELECT Roles.title, Roles.role_id, Departments.department, Roles.salary
// FROM Roles
// JOIN Departments on Roles.title = Departments.dep_role;

// SELECT Employees.id, Employees.first_name, Employees.last_name, Employees.title, Departments.department, Roles.salary, Employees.manager
// FROM Employees, Departments, Roles
// WHERE Employees.title = Roles.title AND Roles.title = Departments.dep_role;

// ==============================================ADD EMPLOYEE=====================================
function addEmployee(data) {
    const allDepartments =
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFirst',
            message: "what is employees first name?",
        },
        {
            type: 'input',
            name: 'empLast',
            message: "what is employees last name?",
        },
        {
            type: 'list',
            name: 'empRole',
            message: "what is the employees role?",
            choices: role
        },
        {
            type: 'list',
            name: 'empManager',
            message: "who is the employees manager?",
            choices: managers
        }
    ]).then((answer) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.empFirst}', '${answer.empLast}', '${answer.empRole}', '${answer.empManager}');`)
    }).then(main)
};
// ================================================UPDATE EMPLOYEE ROLE=====================================
function UpdateEmployeeRole(data) {
    inquirer.prompt([{
        type: 'list',
        name: 'updateEmp',
        message: "which employee do you want to update?",
        choices: employees
    },
    {
        type: 'list',
        name: 'updatedEmpRole',
        message: "what do you want the selected employees new role to be?",
        choices: role
    }
    ]).then((answer) => {
        db.query(`UPDATE employees SET name='${answer.updatedEmpRole}'` )

    })
};
// ============================================ADD DEPARTMENT========================================
function addDepartment(data) {
    inquirer.prompt([{

        type: 'input',
        name: 'addDepartment',
        message: "what is the name of the new department?",
    }]).then(function (answer) {
        db.query(`INSERT INTO department(name) values('${answer.addDepartment}')`,
            console.log(`added ${answer.addDepartment} to the department table`))
    }).then(main)
}
//===========================================ADD ROLE=================================================
async function addRole(data) {

    inquirer.prompt([
        {
            type: 'input',
            name: 'createNewRole',
            message: "what is the new role?",
        },
        {
            type: 'input',
            name: 'newRoleSalery',
            message: "what is the salery for the new role?",
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: "what department is the new role in?",
            choices: [].map(dep => {
                return {
                    name: dep.department,
                    value: dep.id
                }
            })
        }
    ]).then((answer) => {
        let newDepartment = answer.newRoleDepartment
        let departmentId = db.query(`SELECT id FROM department WHERE name=${newDepartment}`)
        let newSalery = parseInt(answer.newRoleSalery)
        db.query(`INSERT INTO roles (title, salary, department_id) values ('${answer.createNewRole}',' ${newSalery}', '${departmentId}')`)
    }).then(main)
};







main()

