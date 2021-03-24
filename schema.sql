DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) 
        REFERENCES department(id) 
        ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
);

use employees;

INSERT INTO department
    (name)
VALUES 
    ('Operations'),
    ('Science'),
    ('Engineering'),
    ('Medical');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Commanding Officer', 200000, 1),
    ('Executive Officer', 150000, 1),
    ('Science Officer', 100000, 2),
    ('Chief Engineer', 100000, 3),
    ('Junior Engineer', 80000, 3),
    ('Chief Medical Officer', 125000, 4),
    ('Nurse', 90000, 4),
    ('Junior Officer 1', 50000, 1),
    ('Ship Counselor', 70000, 1),
    ('Chief Security Officer', 100000, 1);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jean Luc', 'Picard', 1, NULL),
    ('William', 'Riker', 2, 1),
    ('Data', 'Soong', 3, 2),
    ('Geordi', 'LaForge', 4, 2),
    ('Elanor', 'Carlson', 5, 4),
    ('Beverly', 'Crusher', 6, 1),
    ('Alyssa', 'Ogawa', 7, 6),
    ('Reginald', 'Barclay', 8, 4),
    ('Sito', 'Jaxa', 8, 4),
    ('Deanna', 'Troi', 9, 1),
    ('Worf', 'Son of Mogue', 10, 2);
