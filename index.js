const mysql = require('mysql2');
const inquirer = require('inquirer');

// VIEW ALL DEPARTMENTS = Engineering, Finance, Legal, Sales

// VIEW ALL ROLES = Sales lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer

// VIEW ALL EMPLOYEES returns the current array of employees

// ADD DEPARTMENT = prompt, what is the name of the departmet

let employees = ['katie', 'jonah', 'billie', 'zach', 'laura']
let roles = ['lumberjack', 'salesman', 'carpenter', 'talylor swift']
let departments = ['words', 'things', 'another']
let managers = ['this is a boss', 'bossy', 'boss lady']



const main = async () => {
    const main = await 
    inquirer.prompt(
        [{
            type: 'list',
            name: 'next',
            message: 'WHAT WOULD YOU LIKE TO DO?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
        },
        // {
        //     when: (answer) => answer.next === 'View All Employees',
        //     type: 'input',
        //     name: 'viewEmp',
        //     message: "this needs to be fixed",
        //     choices: employees
        // },

        // ----------------------------ADD EMPLOYEE----------------------------------------
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'input',
            name: 'empFirst',
            message: "what is employees first name?",
            // ADD EMPLOYEE = what is first name/what is last name/what is the role/employees manager
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
            name: 'newEmpRole',
            message: "what do you want the selected employees new role to be?",
            choices: roles
        },

        // -----------------------------------VIEW ALL ROLES--------------------------------------
        // {
        //     when: (answer) => answer.next === 'View All Roles',
        //     type: 'input',
        //     name: 'allRoles',
        //     message: "this part isnt quite right",
        //     choices: roles
        
        // },

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

        // ---------------------------------------------VIEW ALL DEPARTMENTS---------------------------
        // {
        //     when: (answer) => answer.next === 'View All Departments',
        //     type: 'input',
        //     name: 'allDepartments',
        //     message: "this needs to be updated like the 'allRoles'  ",
        //     choices: departments
        // },

        // ------------------------------------------------ADD DEPARTMENT------------------------------
        {
            when: (answer) => answer.next === 'Add Department',
            type: 'input',
            name: 'addDepartment',
            message: "what is the name of the new department?",
        },
        ]);
    let {next } = main;
        console.log(next)
    // 'Add Employee', 'Update Employee Role', , 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'
    if (next === 'View All Employees') {
        console.table(employees)
 
    }else if (next === 'View All Roles') {
        console.table(roles)
    }else if (next === 'View All Departments') {
        console.table(departments)
   }
//     teamMembers.push(employee);
//     if (addAnother) {
//         return employeeQuestions();
//     } else {
//         return teamMembers;
//     }
}




    main()