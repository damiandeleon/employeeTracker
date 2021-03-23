const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASS,
  database: 'employees',
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

//function which makes the first prompts
const start = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Would you like to add, view, or update something?",
                name: 'firstQuestion',
                choices: ['add', 'view', 'update employee role', 'EXIT'],
            }
        ])
        .then((answer) => {
            if (answer.firstQuestion === 'add') {
                addSomething();
                } else if (answer.firstQuestion ==='view'){
                viewSomething();
                } else if (answer.firstQuestion === 'update employee role') {
                updateEmployeeRole();
                } else if (answer.firstQuestion === 'EXIT'){
                connection.end();
                }
        });
};

const addSomething = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would yuou like to add?",
                name: 'addChoice',
                choices: ['Add Department', 'Add Role', 'Add Employee', 'EXIT'],
            }
        ])
        .then((answer => {
            switch (answer.addChoice) {
                case 'Add Department':
                    newDepartment();
                    break;
                case 'Add Role':
                    newRole();
                    break;
                case 'Add Employee':
                    newEmployee();
                    break;
                case 'EXIT':
                    connection.end();
                default:
                    connection.end();
            }
        }))
};

const viewSomething = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would yuou like to view?",
                name: 'viewChoice',
                choices: ['View Departments', 'View Roles', 'View Employees', 'EXIT'],
            }
        ])
        .then(answer => {
            switch (answer.viewChoice) {
                case 'View Departments':
                    viewDepartments()
                    break;
                case 'View Roles':
                    viewRoles()
                    break;
                case 'View Employees':
                    viewEmployees()
                    break;
                case 'EXIT':
                    connection.end();
                default:
                    connection.end();
            }
        })
};

const updateEmployeeRole = () => {
    // this is the code to update an employee role
 
    // ***** EXAMPLE *****
    // -- Updates the row where the column name is peter --
    //  UPDATE people
    //  SET has_pet = true, pet_name = "Franklin", pet_age = 2
    //  WHERE name = "Peter";
};




function newDepartment () {
//create newDepartment() function to add a new department with 
//  **id** - INT PRIMARY KEY 
//  **name** - VARCHAR(30) to hold department name

//  ***** EXAMPLE ******
//  INSERT INTO department (id, name)
//  VALUES ("", TRUE, "Rockington", 100);

    inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What department ID would you like to assign to your new dapartment?",
                    name: 'departmentId',
                },
                {
                    type: 'input',
                    message: "What would you like to name your new department?",
                    name: 'departmentName',
                },
                
            ])
            .then((answer) => {
                NewDeptId = answer.departmentId;
                NewDeptName = answer.departmentName;
                console.log(NewDeptId, NewDeptName)
                // ---- NewDeptName to be sent to the database;
            });
};



const newRole = () => {
// create newRole() function to add a new employee role with
//  **id** - INT PRIMARY KEY
//  **title** -  VARCHAR(30) to hold role title
//  **salary** -  DECIMAL to hold role salary
//  **department_id** -  INT to hold reference to department role belongs to

    inquirer
    .prompt([
        {
            type: 'input',
            message: "What department ID would you like to assign to your new dapartment?",
            name: 'departmentId',
        },
        {
            type: 'input',
            message: "What would you like to name your new department?",
            name: 'departmentName',
        },
        
    ])
    .then((answer) => {
        NewDeptId = answer.departmentId;
        NewDeptName = answer.departmentName;
        console.log(NewDeptId, NewDeptName)
        // ---- NewDeptName to be sent to the database;
    });

};

const newEmployee = () => {
//  create newEmployee() function to add a new employee with
//  **id** - INT PRIMARY KEY
//  **first_name** - VARCHAR(30) to hold employee first name
//  **last_name** - VARCHAR(30) to hold employee last name
//  **role_id** - INT to hold reference to role employee has
//  **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
};


function viewDepartments() {
    // create a function that will allow you to view deaprtments using "SELECT * FROM top5000;" after you've downloaded the list of employees.
    const query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        res.forEach(({ id, name}) => {
            console.log(
                `Department ID: ${id} || Department Name: ${name}`
            );
        });
        start();
    });

}


const viewRoles = () => {
// create a function that will allow the user to view 
const query = 'SELECT id, title, salary, department_id FROM role';
connection.query(query, (err, res) => {
    if (err)
        throw err;
    res.forEach(({ id, title, salary, department_id}) => {
        console.log(
            `Role ID: ${id} || Title: ${title} || Salary: ${salary} || Department ID: ${department_id}`
        );
    });
    start();
});
}

const viewEmployees = () => {
        const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
    connection.query(query, (err, res) => {
        if (err)
            throw err;
        res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            console.log(
                `Employee ID: ${id} || Name: ${first_name} ${last_name} || Role: ${role_id} || Manager ID: ${manager_id}`
            );
        });
        start();
    });
}

// `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name FROM employee INNER JOIN role ON (employee.role_id = role.id) WHERE employee.role_id = ? AND role.id = ?) ORDER BY employee.id`;
