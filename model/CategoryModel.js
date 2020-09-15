const sql = require('../config/Db.js');

exports.All = () => {
	return new Promise((resolve, reject) => {
		sql.query(
			'SELECT * FROM category AS c INNER JOIN category_descrption AS ct ON c.categoryId= ct.categoryId',
			(err, res) => {
				// console.log(res[0]);
				if (err) {
					return reject(err);
				} else {
					resolve(res);
				}
			}
		);
	});
};
