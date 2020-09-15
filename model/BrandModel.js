const sql = require('../config/Db.js');

exports.All = () => {
	return new Promise((resolve, reject) => {
		sql.query('SELECT * FROM brand ORDER BY sortOrder', (err, res) => {
			// console.log(res[0]);
			if (err) {
				return reject(err);
			} else {
				resolve(res);
			}
		});
	});
};
