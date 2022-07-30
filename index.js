const mysql = require('mysql2');
const inquirer = require('inquirer');

// VIEW ALL DEPARTMENTS = Engineering, Finance, Legal, Sales

// VIEW ALL ROLES = Sales lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer

// VIEW ALL EMPLOYEES returns the current array of employees

// ADD DEPARTMENT = prompt, what is the name of the departmet

let employees = ['katie', 'jonah', 'billie', 'zach', 'laura']
let roles = ['lumberjack', 'salesman', 'carpenter', 'talylor swift']



const main = async () => {
    const employeeQuestions = await inquirer.prompt(
        [{
            type: 'list',
            name: 'next',
            message: 'WHAT WOULD YOU LIKE TO DO?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employees'],
        },
        {
            when: (answer) => answer.next === 'View All Employees',
            type: 'input',
            name: 'viewEmp',
            message: "enter interns's school",
        },

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
            type: 'input',
            name: 'empRole',
            message: "what is employees role?",
        },
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'input',
            name: 'empManager',
            message: "who is employees manager?",
        },
        {
            when: (answer) => answer.next === 'Add Employee',
            type: 'input',
            name: 'viewemp',
            message: "who is employees manager?",
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
        {
            when: (answer) => answer.next === 'View All Roles',
            type: 'input',
            name: 'allRoles',
            message: "this part isnt quite right",
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
        {
            when: (answer) => answer.next === 'View All Departments',
            type: 'input',
            name: 'school',
            message: "enter interns's school",
        },
        {
            when: (answer) => answer.next === 'Add Department',
            type: 'input',
            name: 'school',
            message: "enter interns's school",
        },
        {
            when: (answer) => answer.next === 'View All Employees',
            type: 'input',
            name: 'school',
            message: "enter interns's school",
        },
        
        ]);
    let { name, id, email, role, github, school, addAnother } = main;
    let employee;
    if (role === 'engineer') {
        employee = new Engineer(name, id, email, github);
        console.log(employee);
    } else if (role === 'intern') {
        employee = new Intern(name, id, email, school);
        console.log(employee);
    }
    teamMembers.push(employee);
    if (addAnother) {
        return employeeQuestions();
    } else {
        return teamMembers;
    }
}





const init = () => {
    main()
    .then(function(data){
        writeToFile('README.md', generateMarkdown(data));
        console.log(data)
    })  

}

init()