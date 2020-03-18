const mysql = require("mysql");
const inquirer = require("inquirer");

//create my sql connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Janvier1995@",
  database: "company_DB"
});

//connect

connection.connect(function(err) {
  if (err) throw err;
  interactWithDB();
});

//The app function
function interactWithDB() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update", "Delete"]
    })
    .then(function(answer) {
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
      choices: ["Department", "Role", "Employee"]
    })
    .then(function(answer) {
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
}

//Define addDepartment function
function addDepartment() {
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What the name of the department?"
    })
    .then(function(answer) {
      let sql = "INSERT INTO department (name) VALUES (?)";
      connection.query(sql, answer.action, function(err, result) {
        if (err) throw err;
        console.log("Department added! Next...");
      });
    });
}

//Define addRole function
function addRole() {
  const myChoices = [];
  const departmentIdName = {};

  availableDepartments();

  const questions = [
    {
      name: "title",
      type: "input",
      message: "What is the job title/position?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this position/title?"
    },
    {
      name: "departmentID",
      type: "list",
      message: "Please select the department for this role?",
      choices: myChoices
    }
  ];
  //const availableD = availableDepartments();
  //const departChoices = availableD.map();

  //function to provide departments as choices and reference it ID to the role
  function availableDepartments() {
    let sql = "SELECT * FROM department";
    connection.query(sql, async function(err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        myChoices.push(result[i].name);
        departmentIdName[result[i].name] = result[i].id;
      }
    });
  }
  //send data to the
  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
      [answer.title, answer.salary, departmentIdName[answer.departmentID]],
      function(err, result) {
        if (err) throw err;
        console.log("Role added! Next...");
      }
    );
  });
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
        "The total utilized budget of a department"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Departments":
          viewDepartments();
          break;

        case "Roles":
          viewRoles();
          break;

        case "Employees":
          viewEmployees();
          break;

        case "Employees by manager":
          viewEmployeesByManager();
          break;

        case "The total utilized budget of a department":
          viewTheTotalUtilizedBudgetOfADepartment();
          break;
      }
    });
}

//Define general Update employee's role and employee's manager function
function update() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to update?",
      choices: ["Employee's role", "Employee's manager"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Employee's role":
          updateEmployeesRole();
          break;

        case "Employee's manager":
          updateEmployeesManager();
          break;
      }
    });
}

function toDelete() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to delete?",
      choices: ["Departments", "Roles", "Employees"]
    })
    .then(function(answer) {
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
}
