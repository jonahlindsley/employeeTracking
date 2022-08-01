
DROP DATABASE IF EXISTS employee_tracking;

CREATE DATABASE employee_tracking;

USE employee_tracking;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
    
);
CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40),
    salary INT,
    department_id INT
    
);
CREATE TABLE employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role_id INT,
    manager_id INT
    );
    