require("dotenv").config();
const mysql = require("mysql2");


module.exports ={
    db : mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.SQL_PASSWORD,
  database: process.env.DATABASE,
})
}