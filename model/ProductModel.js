const sql = require('../config/db');
const product = {};

product.All = () => {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT pd.productId, pi.image, pd.name, p.price, b.name AS "brand", cd.name AS "category", p.quantity, p.status FROM `product` AS p LEFT JOIN `product_description` AS pd ON pd.productId = p.productId LEFT JOIN product_to_category AS ptc ON ptc.productId = p.productId LEFT JOIN category_descrption AS cd ON cd.categoryId = ptc.categoryId LEFT JOIN product_image AS pi ON pi.productId = p.productId LEFT JOIN brand AS b ON b.brandId = p.brandId',
      (err, res) => {
        // console.log(res[0]);
        if (err) {
          return reject(err);
        } else {
          if (res.length === 0) {
            return resolve(res);
          }
          resolve(res);
        }
      }
    );
  });
};

module.exports = product;
