const mysql = require('mysql');
const inquirer = require('inquirer');

//function which makes the first prompts
const start = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Would you like to add, view, or update something?",
                name: 'firstQuestion',
                choices: ['add', 'view', 'update employee role'],
            }
        ])
        .then((answer) => {
            if (answer.firstQuestion === 'add') {
                addSomething();
                } else if (answer.firstQuestion ==='view'){
                viewSomething();
                } else if (answer.firstQuestion === 'update employee role') {
                updateSomething();
                } else {
                connection.end();
            }
        });
};

function addSomething() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would yuou like to add?",
                name: 'addChoice',
                choices: ['New Department', 'New Role', 'New Employee'],
            }
        ])
        .then(answer => {
            switch (answer) {
                case 'New Department':
                    newDepartment()
                    break;
                case 'New Role':
                    newRole()
                    break;
                case 'New Employee':
                    newEmployee()
                    break;
                default:
                    connection.end();
            }
        })
};

function viewSomething() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would yuou like to view?",
                name: 'viewChoice',
                choices: ['View Departments', 'View Roles', 'View Employees'],
            }
        ])
        .then(answer => {
            switch (answer) {
                case 'View Departments':
                    viewDepartments()
                    break;
                case 'View Roles':
                    viewRoles()
                    break;
                case 'View Employees':
                    viewEmployees()
                    break;
                default:
                    connection.end();
            }
        })
};

function updateSomething() {
    // this is the code to update an employee role
}


start();




