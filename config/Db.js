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
	dbConfig = process.env.CLEARDB_DATABASE_URL;
}
var connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
	if (err) throw err;
	console.log('Db Connected!');
});

module.exports = connection;
