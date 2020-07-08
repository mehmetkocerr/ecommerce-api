const ProductModel = require('../model/ProductModel.js');

exports.All = async (req, res) => {
  const data = await ProductModel.All();
  res.status(200).json(data);
};
