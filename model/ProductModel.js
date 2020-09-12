const sql = require('../../config/db');

exports.All = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT pd.productId, pi.url, pd.name, p.price, b.name AS "brand", group_concat(cd.name) as category, p.quantity, p.status FROM product AS p LEFT JOIN product_description AS pd ON pd.productId = p.productId LEFT JOIN product_to_category AS ptc ON ptc.productId = p.productId LEFT JOIN category_descrption AS cd ON cd.categoryId = ptc.categoryId LEFT JOIN product_image AS pi ON pi.productId = p.productId LEFT JOIN brand AS b ON b.brandId = p.brandId WHERE pd.languageId = 1  AND pi.sortOrder=1 GROUP BY p.productId',
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
exports.Product = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT p.*, b.brandId  FROM product AS p INNER JOIN brand AS b ON p.brandId = b.brandId WHERE p.productId = ' +
        id,
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
exports.ProductDescription = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT pd.*, l.name AS "languageName", l.sortOrder, l.status, l.image FROM product_description AS pd INNER JOIN language AS l ON pd.languageId = l.languageId WHERE pd.productId = ' +
        id +
        ' AND l.status=1 ORDER BY l.sortOrder',
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
exports.ProductImages = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM product_image WHERE productId = ? ORDER BY sortOrder',
      id,
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
exports.ProductCategories = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT cd.categoryId FROM product_to_category as ptc INNER JOIN category_descrption as cd ON ptc.categoryId = cd.categoryId INNER JOIN category AS c ON c.categoryId = cd.categoryId WHERE ptc.productId = ' +
        id,
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
