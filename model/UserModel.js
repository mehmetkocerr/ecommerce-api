const sql = require('../config/db');
const user = {};

user.Register = (UserData) => {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO admin_user set ?', UserData, (err, res, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

user.FindOne = (Email) => {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM admin_user WHERE email = ?', Email, (err, res) => {
      // console.log(res[0]);
      if (err) {
        return reject({
          status: false,
          data: err,
        });
      } else {
        if (res.length === 0) {
          return resolve({
            status: false,
            data: res,
          });
        }
        resolve({
          status: true,
          data: res,
        });
      }
    });
  });
};

module.exports = user;
