const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
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
            } else if (answer.firstQuestion === 'view') {
                viewSomething();
            } else if (answer.firstQuestion === 'update employee role') {
                updateEmployeeRole();
            } else if (answer.firstQuestion === 'EXIT') {
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
                    break;
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
                choices: ['View Employees by Departments', 'View Employees by Roles', 'View All Employees', 'EXIT'],
            }
        ])
        .then(answer => {
            switch (answer.viewChoice) {
                case 'View Employees by Departments':
                    viewDepartments()
                    break;
                case 'View Employees by Roles':
                    viewRoles()
                    break;
                case 'View All Employees':
                    viewEmployees()
                    break;
                case 'EXIT':
                    connection.end();
                    break;
                default:
                    connection.end();
            }
        })
};

function viewDepartments() {
    // create a function that will allow you to view deaprtments
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        start();
    });
}



const viewRoles = () => {
    // create a function that will allow the user to view 
    const query = `SELECT role.title, employee.id as EID, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        start();
    });
}


const viewEmployees = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        start();
    });
}

const updateEmployeeRole = () => {
    const query = `SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS full_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager ON manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee 
                SET role_id = (SELECT id FROM role WHERE title = ? ) 
                WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(employee.first_name," ",employee.last_name) = ?) AS tmptable)`, [answer.newRole, answer.empl], (err, results) => {
                if (err) throw err;
                console.log(`Success!  ${answer.empl} has been successfully updated to the new role of ${answer.newRole}! `)
                start();
            })
        })


    })

};




function newDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What would you like to name your new department?",
                name: 'departmentName',
            },

        ])
        .then((answer) => {
            let deptName = answer.departmentName;
            console.log(JSON.stringify(deptName));
            const query = `INSERT INTO department (name) VALUES(${JSON.stringify(deptName)});`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Success!  ${deptName} has been added to the department list.`);

                start();
            });
        });
};

function viewAvailDepartments() {
    // create a function that will allow you to view deaprtments
    const query = `SELECT department.name AS department, department.id
    FROM department
    ORDER BY department.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('\n');
        console.log('\n');
        console.log('FOR REFERENCE:  ACTIVE DEPARTMENTS.');
        console.log('\n');
        console.table(res);
        console.log('\n');
        console.log('Press down arrow to continue')
    });
}

const newRole = () => {
    viewAvailDepartments();

    inquirer
        .prompt([
            {
                type: 'input',
                message: `Which department ID (number value) will the new role belong to?`,
                name: 'roleDepartment',
            },
            {
                type: 'input',
                message: "What would you like to name your new role?",
                name: 'roleName',
            },
            {
                type: 'input',
                message: "What is the new role's salary?",
                name: 'roleSalary',
            },
        ])
        .then((answer) => {
            let roleName = answer.roleName;
            let roleSalary = answer.roleSalary;
            let roleDepartment = answer.roleDepartment;

            const query = `INSERT INTO role (title, salary, department_id) VALUES(${JSON.stringify(roleName)}, ${JSON.stringify(roleSalary)}, ${JSON.stringify(roleDepartment)});`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Success!  ${roleName} has been added to the department list.`);

                start();
            });
        });
};

const viewAvailRoles = () => {
    const query = `SELECT role.id AS role_id, role.title
    FROM role
    ORDER BY role.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('\n');
        console.log('\n');
        console.log('\n');
        console.log('FOR REFERENCE:  CURRENT ORG');
        console.table(res);

    });
}
const viewManagers = () => {
    const query = `SELECT employee.id as ManagerID, CONCAT(employee.first_name, ' ', employee.last_name) AS manager, role.title, department.name AS department
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        console.log('Press down arrow to continue')
    });
}

const newEmployee = () => {
    viewAvailRoles();
    viewManagers();
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What role ID will the employee be assigned?",
                name: 'roleID',
            },
            {
                type: 'input',
                message: "Which maanger ID will the employee report to?",
                name: 'managerID',
            },
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'empFName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'empLName',
            },
        ])
        .then((answer) => {
            console.log("Thanks!")
            let roleID = answer.roleID;
            let managerID = answer.managerID;
            let empFName = answer.empFName;
            let empLName = answer.empLName;

            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(${JSON.stringify(empFName)}, ${JSON.stringify(empLName)}, ${JSON.stringify(roleID)}, ${JSON.stringify(managerID)});`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Success!  ${empFName} ${empLName} has been added to the employee list.`);

                start();
            });
        });
};




// `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name FROM employee INNER JOIN role ON (employee.role_id = role.id) WHERE employee.role_id = ? AND role.id = ?) ORDER BY employee.id`;

// SELECT employee.id, employee.first_name, employee.last_name, department.name
// FROM employee
// INNER JOIN department ON employee.role_id = role.title;