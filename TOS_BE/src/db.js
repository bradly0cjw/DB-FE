// TOS_BE/src/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'database',
  user: 'dbuser',
  password: 'dbpassword',
  database: 'dbproj',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;