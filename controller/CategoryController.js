const CategoryModel = require('../model/CategoryModel.js');

exports.All = async (req, res) => {
  const data = await CategoryModel.All();
  res.status(200).json(data);
};
