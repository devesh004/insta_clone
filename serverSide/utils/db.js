const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = db;
