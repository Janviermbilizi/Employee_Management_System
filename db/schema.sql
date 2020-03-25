DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL, /*to hold reference to department role belongs to*/
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  isManager BOOLEAN NOT NULL,
  superviserORmanager_id INT,
  /*to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager*/
  PRIMARY KEY (id)
);