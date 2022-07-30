


CREATE DATABASE the_foxy_knowledge_seekers;

USE the_foxy_knowledge_seekers;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name: VARCHAR(30) NOT NULL,
    
);
CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL,
    department_id:INT
    
);
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id:INT,
    manager_id:INT
    );