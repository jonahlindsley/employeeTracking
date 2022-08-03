
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
async function allEmployees(dep_id) {
    const results = await db.query(`SELECT * FROM employees`)
    // console.table(results[0])
    return results[0]
}

// job title, role id, the department that role belongs to, and the salary for that role
async function getAllTheRoles() {
    const results = await db.query(`
    SELECT roles.title AS 'JOB TITLE' , roles.id AS 'ROLE NUMBER', department.name AS DEPARTMENT, roles.salary AS SALERY
    FROM roles
    JOIN department on roles.department_id=department.id;
    `);
    console.table(results[0]);
}

function roles() {
    getAllTheRoles()
        .then(main)
}
async function getTheRoles(dep_id) {
    const results = await db.query(`SELECT title FROM roles WHERE department_id=${dep_id};`)
    // console.table(results[0])
    return results[0]
}
async function allRoles(dep_id) {
    const results = await db.query(`SELECT title, id FROM roles`)
    // console.table(results[0])
    console.log( results[0])
    return results[0]
}

// SELECT Roles.title, Roles.role_id, Departments.department, Roles.salary
// FROM Roles
// JOIN Departments on Roles.title = Departments.dep_role;

const role = db.query(`SELECT * FROM roles;`);

async function viewAllDepartments() {
    const results = await db.query(`SELECT * FROM department;`)
    // console.table(results[0])
    return results[0]
}
function departments() {
    showDepartments()
        .then(main)
}
async function showDepartments() {
    const results = await db.query(`SELECT * FROM department;`)
    console.table(results[0])
    return results[0]
}
async function managerList() {
    const results = await db.query(`SELECT first_name FROM employees WHERE manager_id = none;`);
    console.table(results[0]);
}
// get all departments, then in the prompt we show them all the departments as a list then they can select the one that tthey ewant to add a new role to when they select it i can grab the id of the selected department


async function department() {
    const results = await db.query(`SELECT * FROM department;`)
}
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

// SELECT Employees.id, Employees.first_name, Employees.last_name, Employees.title, Departments.department, Roles.salary, Employees.manager
// FROM Employees, Departments, Roles
// WHERE Employees.title = Roles.title AND Roles.title = Departments.dep_role;

// ==============================================ADD EMPLOYEE=====================================
async function addEmployee(data) {
    var departments = await viewAllDepartments()
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
            name: 'empdepartment',
            message: "what is the employees department?",
            choices: departments.map(dep => {
                return {
                    name: dep.name,
                    value: dep.id
                }
            })
        }])
        .then((answer) => {
            // make a req for all deps return the roles in the department they chose
            // async function viewAllDepartments() {
                // console.table(results[0])
                var halfAMan = [answer.empFirst, answer.empLast, answer.empdepartment]

                return halfAMan
            })
            .then((dep_id) => {
                console.log(`${dep_id[2]}`)
                oneDepartment()
                async function oneDepartment() {
                const results = await getTheRoles(dep_id[2])
                

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'empRole',
                        message: "what is the employees role?",
                        choices: ['4', '5']
                        // results[0].map(dep => {
                        //     return {
                        //         name: dep.title,
                        //         value: dep.id
                        //     }
                        // })
                    },
                    {
                        type: 'list',
                        name: 'empManager',
                        message: "who is the employees manager?",
                        choices: ['managers', 'thing']
                    }
                ])}
            
            }).then((answer) => {
                console.log('this works!!!!!')
                // db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.empFirst}', '${answer.empLast}', '${answer.empRole}', '${answer.empManager}');`)
            }).then(main)

    // break here and retereive the roles that are under the department then start another prompt with the last questions

};
// ================================================UPDATE EMPLOYEE ROLE=====================================
async function UpdateEmployeeRole(data) {
    var updateAnEmployee =  await allEmployees()
    var updateARole =  await allRoles()
    inquirer.prompt([{
        type: 'list',
        name: 'updateEmp',
        message: "which employee do you want to update?",
        choices: updateAnEmployee.map(dep => {
            return {
                name: dep.first_name,
                value: dep.id
            }
        })
    },
    {
        type: 'list',
        name: 'updatedEmpRole',
        message: "what do you want the selected employees new role to be?",
        choices: updateARole.map(dep => {
            return {
                name: dep.title,
                value: dep.id
            }
        })
    },
    ]).then((answer) => {
        console.log(answer)
        db.query(`UPDATE employees SET role_id='${answer.updatedEmpRole}' WHERE id='${answer.updateEmp}'`)
        console.log(`successfully updated employee role`)
    }).then(main)
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

    var departments = await viewAllDepartments();
    // console.log(roleChoices)
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
            choices: departments.map(dep => {
                return {
                    name: dep.name,
                    value: dep.id
                }
            })

    
        }
    ]).then((answer) => {
        let newSalery = parseInt(answer.newRoleSalery)
        db.query(`INSERT INTO roles (title, salary, department_id) values ('${answer.createNewRole}','${newSalery}', '${answer.newRoleDepartment}')`)
        console.log(`added ${answer.createNewRole} to roles`)
    }).then(main)
};







main()

