const dotenv = require('dotenv');
dotenv.config();

//Connect to DB

var mysql = require('mysql');

const dev = process.env.NODE_ENV !== 'production';

let dbConfig = '';
//development mysql db connection
if (dev) {
	dbConfig = {
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
	};
}
//production mysql db connection
else {
	dbConfig = {
		host: process.env.PROD_HOST,
		user: process.env.PROD_USER,
		password: process.env.PROD_PASSWORD,
		database: process.env.PROD_DATABASE,
	};
}
var connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
	if (err) throw err;
	console.log('Db Connected!');
});

module.exports = connection;
