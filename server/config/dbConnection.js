var mysql = require("mysql");

// const dbConnection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "couponsmania",
  
// });

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
