const dotenv = require('dotenv');
dotenv.config();

//Connect to DB

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Db Connected!");
});

module.exports = connection;