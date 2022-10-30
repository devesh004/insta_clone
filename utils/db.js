const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: process.env.database_host,
//   user: process.env.database_user,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: 3306,
//   insecureAuth: true,
//   multipleStatements: true,
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "devesh",
  password: "Devesh@123",
  database: "insta_clone_database",
  port: 3306,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = db;
