var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'farm_db'
})

connection.connect();

module.exports = connection;