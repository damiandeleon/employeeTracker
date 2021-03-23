use employees;

INSERT INTO department
    (name)
VALUES 
    ('Operations'),
    ('Science'),
    ('Engineering')
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
    ('Nurse' 90000, 4),
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
