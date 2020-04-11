-- add departments
INSERT INTO department
  (name)
VALUES
  ("Management");
INSERT INTO department
  (name)
VALUES
  ("Employment");
INSERT INTO department
  (name)
VALUES
  ("Health");
INSERT INTO department
  (name)
VALUES
  ("Immigration");


-- add roles
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Case Manager", "50000", 1);
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Case worker", "40000", 1);

INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Employment superviser", "50000", 2);
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Career Counselor", "40000", 2);
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("job developper", "45000", 2);

INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Health Coordinator", "50000", 3);
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Health Aid", "40000", 3);


INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Immigration Director", "60000", 4);
INSERT INTO role
  (title, salary, department_id)
VALUES
  ("Immigration specialist", "40000", 4);

-- add Employee
INSERT INTO employee
  (first_name, last_name, role_id, isManager)
VALUES
  ("Janvier", "Mbilizi", 1, true);

INSERT INTO employee
  (first_name, last_name, role_id, isManager, superviserORmanager_id)
VALUES
  ("Soma", "Sabuni", 2, false, 1);

INSERT INTO employee
  (first_name, last_name, role_id, isManager)
VALUES
  ("Alula", "Mame", 3, true);
INSERT INTO employee
  (first_name, last_name, role_id, isManager, superviserORmanager_id)
VALUES
  ("Morgan", "Makelele", 4, false, 3);
INSERT INTO employee
  (first_name, last_name, role_id, isManager, superviserORmanager_id)
VALUES
  ("Maddy", "Ndulu", 5, false, 3);

INSERT INTO employee
  (first_name, last_name, role_id, isManager)
VALUES
  ("Walah", "Shabani", 6, true);
INSERT INTO employee
  (first_name, last_name, role_id, isManager, superviserORmanager_id)
VALUES
  ("Evelyn", "Sky", 7, false, 6);

INSERT INTO employee
  (first_name, last_name, role_id, isManager)
VALUES
  ("April", "Dec", 8, true);
INSERT INTO employee
  (first_name, last_name, role_id, isManager, superviserORmanager_id)
VALUES
  ("sidney", "Mark", 9, false, 8);
