const mysql = require("mysql");
const util = require("util");
const inquirer = require("inquirer");

//create my sql connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Janvier1995!",
  database: "company_DB",
});

//connect

connection.connect();
//The app function
interactWithDB();
connection.query = util.promisify(connection.query);

async function availableDepartments() {
  let sql = "SELECT * FROM department";
  const departments = await connection.query(sql);

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  return departmentChoices;
}
async function availableRole() {
  let sql = "SELECT * FROM role";
  const roles = await connection.query(sql);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  return roleChoices;
}

async function availableEmployees() {
  let sql = "SELECT * FROM employee";
  const employees = await connection.query(sql);

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  return employeeChoices;
}
async function availableManager() {
  let sql = "SELECT * FROM employee WHERE isManager=1";
  const managers = await connection.query(sql);

  const manChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  return manChoices;
}

function interactWithDB() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update", "Delete", "Exit"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add":
          add();
          break;

        case "View":
          view();
          break;

        case "Update":
          update();
          break;

        case "Delete":
          toDelete();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
}

//Define general add department, role and employee function
function add() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Department":
          addDepartment();
          break;

        case "Role":
          addRole();
          break;

        case "Employee":
          addEmployee();
          break;
      }
    });
  //Define addDepartment function
  function addDepartment() {
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "What the name of the department?",
      })
      .then(function (answer) {
        let sql = "INSERT INTO department (name) VALUES (?)";
        connection.query(sql, answer.action, function (err, result) {
          if (err) throw err;
          console.log("Department added! Next...");
          interactWithDB();
        });
      });
  }

  //Define addRole function
  async function addRole() {
    let myChoices = [];
    const departmentIdName = {};

    availableDepartments();

    const questions = [
      {
        name: "title",
        type: "input",
        message: "What is the job title/position?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this position/title?",
      },
      {
        name: "departmentID",
        type: "list",
        message: "Please select the department for this role?",
        choices: myChoices,
      },
    ];
    //const availableD = availableDepartments();
    //const departChoices = availableD.map();

    //function to provide departments as choices and reference it ID to the role
    function availableDepartments() {
      let sql = "SELECT * FROM department";
      connection.query(sql, async function (err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
          myChoices.push(result[i].name);
          departmentIdName[result[i].name] = result[i].id;
        }
      });
    }
    //send data to the
    inquirer.prompt(questions).then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answer.title, answer.salary, departmentIdName[answer.departmentID]],
        function (err, result) {
          if (err) throw err;
          console.log("Role added! Next...");
          interactWithDB();
        }
      );
    });
  }
  //Define addEmployee function
  async function addEmployee() {
    const roleIdTitle = {};
    const managerId = {};
    // cosnt myDepartments = await avaialbeDepartements()
    const myRoleChoices = await availableRole();

    const myManagerChoices = await availableManager();

    const questions = [
      {
        name: "firstName",
        type: "input",
        message: "What the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What the employee's last name?",
      },
      {
        name: "roleID",
        type: "list",
        message: "Please select the role/position for this employee?",
        choices: myRoleChoices,
      },
      {
        name: "manager",
        type: "confirm",
        message: "Is this a manager or superviser position?",
      },
      {
        name: "managerID",
        type: "list",
        message: "Please select the manager/superviser of this employee?",
        choices: myManagerChoices,
      },
    ];
    //const availableD = availableDepartments();
    //const departChoices = availableD.map();

    //function to provide departments as choices and reference it ID to the role

    //send data to the
    const answer = await inquirer.prompt(questions);
    const res = await connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, isManager, superviserORmanager_id) VALUES (?,?,?,?,?)",
      [
        answer.firstName,
        answer.lastName,
        answer.roleID,
        answer.manager,
        answer.managerID,
      ]
    );
    console.log(
      `${answer.firstName} ${answer.lastName} was added as an employee. Next...`
    );
    interactWithDB();
  }
}

//Define general View departments, roles, employees, employees by manager and the total utilized budget of a department function
function view() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to view?",
      choices: [
        "Departments",
        "Roles",
        "Employees",
        "Employees by manager",
        "The total utilized budget of a department",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Departments":
          availableDepartment();
          break;

        case "Roles":
          availableRoles();
          break;

        case "Employees":
          availableEmployee();
          break;

        case "Employees by manager":
          viewEmployeesByManager();
          break;

        case "The total utilized budget of a department":
          viewTheTotalUtilizedBudgetOfADepartment();
          break;
      }
    });

  function availableDepartment() {
    let sql = "SELECT * FROM department";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].name);
        interactWithDB();
      }
    });
  }
  function availableRoles() {
    let sql = "SELECT * FROM role";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].title);
        interactWithDB();
      }
    });
  }
  function availableEmployee() {
    let sql = "SELECT * FROM employee";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        console.log(`${result[i].first_name} ${result[i].last_name}`);
        interactWithDB();
      }
    });
  }

  //function for viewing employees by their manager
  async function viewEmployeesByManager() {
    let managerChoices = [];

    managerChoices = await availableManager();

    await inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which manager would you like to view's employee(s)",
        choices: managerChoices,
      })
      .then(function (answer) {
        connection.query(
          "SELECT * FROM employee WHERE superviserORmanager_id='?'",
          answer.action,
          function (err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
              console.log(`${result[i].first_name} ${result[i].last_name}`);
              interactWithDB();
            }
          }
        );
      });
  }
  //function for viewing a total utilized badget of a department
  async function viewTheTotalUtilizedBudgetOfADepartment() {
    let departmentChoices = [];

    departmentChoices = await availableDepartments();

    await inquirer
      .prompt({
        name: "action",
        type: "list",
        message:
          "Which department would you like to view the total utilized budget",
        choices: departmentChoices,
      })
      .then(function (answer) {
        connection.query(
          "SELECT SUM(role.salary) as total, department.name as name FROM ((role INNER JOIN employee ON role.id = employee.role_id) INNER JOIN department ON role.department_id = department.id) WHERE department.id = ? GROUP BY department.id",
          answer.action,
          function (err, result) {
            if (err) throw err;
            console.log(
              `The total utilized budget for ${result[0].name} department is $${result[0].total}`
            );
            interactWithDB();
          }
        );
      });
  }
}

//Define general Update employee's role and employee's manager function
function update() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to update?",
      choices: ["Employee's role", "Employee's manager"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Employee's role":
          updateEmployeesRole();
          break;

        case "Employee's manager":
          updateEmployeesManager();
          break;
      }
    });

  async function updateEmployeesRole() {
    let Choices = [];
    let myRoleChoices = [];

    myRoleChoices = await availableRole();

    Choices = await availableEmployees();

    const answer = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Which employee would you like to update",
        choices: Choices,
      },
      {
        name: "newRole",
        type: "list",
        message: "What's the employee's new role",
        choices: myRoleChoices,
      },
    ]);

    connection.query(
      "UPDATE employee SET role_id ='?' WHERE id='?'",
      [answer.newRole, answer.action],
      function (err, result) {
        if (err) throw err;
        console.log("updated! next...");
        interactWithDB();
      }
    );
  }
  async function updateEmployeesManager() {
    let Choices = [];
    let myManagerChoices = [];

    myManagerChoices = await availableManager();

    Choices = await availableEmployees();

    const answer = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Which employee would you like to update",
        choices: Choices,
      },
      {
        name: "newManager",
        type: "list",
        message: "What's the employee's new manager",
        choices: myManagerChoices,
      },
    ]);

    connection.query(
      "UPDATE employee SET superviserORmanager_id ='?' WHERE id='?'",
      [answer.newManager, answer.action],
      function (err, result) {
        if (err) throw err;
        console.log("updated! next...");
      }
    );
  }
}

function toDelete() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to delete?",
      choices: ["Departments", "Roles", "Employees"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Departments":
          deleteDepartments();
          break;

        case "Roles":
          deleteRoles();
          break;

        case "Employees":
          deleteEmployees();
          break;
      }
    });

  async function deleteDepartments() {
    let listOfDepartments = [];

    listOfDepartments = await availableDepartments();

    await inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which department would you like to delete",
        choices: listOfDepartments,
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM department WHERE id='?'",
          answer.action,
          function (err, result) {
            if (err) throw err;
            console.log("deleted!! next...");
            interactWithDB();
          }
        );
      });
  }
  async function deleteRoles() {
    let myRoleChoices = [];

    myRoleChoices = await availableRole();

    await inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which role would you like to delete",
        choices: myRoleChoices,
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM role WHERE id='?'",
          answer.action,
          function (err, result) {
            if (err) throw err;
            console.log("deleted!! next...");
            interactWithDB();
          }
        );
      });
  }
  async function deleteEmployees() {
    let Choices = [];

    Choices = await availableEmployees;

    await inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which employee would you like to delete",
        choices: Choices,
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM employee WHERE id='?'",
          answer.action,
          function (err, result) {
            if (err) throw err;
            console.log("deleted!! next...");
            interactWithDB();
          }
        );
      });
  }
}
