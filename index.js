const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection')



let employees = ['katie', 'jonah', 'billie', 'zach', 'laura']
let roles = ['lumberjack', 'salesman', 'carpenter',]
let departments = ['words', 'things', 'another']
let managers = ['kevin', 'creed', 'andy']



const main = async () => {
    const main = await 
    inquirer.prompt(
        [{
            type: 'list',
            name: 'next',
            message: 'WHAT WOULD YOU LIKE TO DO?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
        },

        // ----------------------------ADD EMPLOYEE----------------------------------------
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'input',
            name: 'empFirst',
            message: "what is employees first name?",
        },
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'input',
            name: 'empLast',
            message: "what is employees last name?",
        },
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'list',
            name: 'empRole',
            message: "what is the employees role?",
            choices: roles
        },
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'list',
            name: 'empManager',
            message: "who is the employees manager?",
            choices: managers
        },

        //---------------------------UPDATE EMPLOYEE ROLE-----------------------------------
        {
            when: (answer) => answer.next === 'Update Employee Role',
            type: 'list',
            name: 'updateEmp',
            message: "which employee do you want to update?",
            choices: employees
            // UPDATE EMPLOYEE ROLE = which employee do you want to update/what do you want the new role to be
        },
        {
            when: (answer) => answer.next === 'Update Employee Role',
            type: 'list',
            name: 'updatedEmpRole',
            message: "what do you want the selected employees new role to be?",
            choices: roles
        },

        // ---------------------------------------ADD ROLE-----------------------------------------
        {
            when: (answer) => answer.next === 'Add Role',
            type: 'input',
            name: 'createNewRole',
            message: "what is the new role?",
        },
        {
            when: (answer) => answer.next === 'Add Role',
            type: 'input',
            name: 'newRoleSalery',
            message: "what is the salery for the new role?",
        },

        // ------------------------------------------------ADD DEPARTMENT------------------------------
        {
            when: (answer) => answer.next === 'Add Department',
            type: 'input',
            name: 'addDepartment',
            message: "what is the name of the new department?",
        },
        ]);
    let {next, empFirst, empLast, empRole, empManager, updateEmp, updatedEmpRole, createNewRole, newRoleSalery} = main;
    console.log(next)
    // , 'Update Employee Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'
    if (next === 'View All Employees') {
        console.table(employees)
        
    }else if (next === 'View All Roles') {
        console.table(roles)
    }else if (next === 'View All Departments') {
        console.table(departments)
    }else if (next === 'Add Employee'){
       let newEmployee = {firstName: empFirst, lastName: empLast, role: empRole, manager: empManager}
        employees.push(newEmployee)
       
        console.log(newEmployee)
        console.log(employees)
   }else if (next === 'Add Role'){
    let newRole = {newRole: createNewRole, newSalery: newRoleSalery}
    roles.push(newRole)
    console.log(roles)
   }
}

console.log(roles)


    main()