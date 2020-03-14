DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL, /*to hold reference to department role belongs to*/
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT, /*to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager*/
  PRIMARY KEY (id)
);