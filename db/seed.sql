USE employee_tracking;


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('jonah', 'lindsley', 4, 1),
('jamie', 'smith', 2, 2),
('kevin', 'malone', 1, 2),
('creed', 'bratton', 2, 0),
('erin', 'halpert', 1, 3),
 ('katie', 'lee', 3, 0);


INSERT INTO roles (title, salary, department_id) VALUES
 ('carpenter', '45000', 4),
  ('salesperson', '33000', 3),
   ('lawyer', '745000', 3),
    ('cook', '55000', 2);

    INSERT INTO department (name) VALUES
    ('legal'),
    ('kitchen'),
    ('sales'),
    ('construction');
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    -- title VARCHAR(40),
    -- salary INT,
    -- department_id INT
    