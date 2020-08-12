const BrandModel = require('../model/BrandModel');

exports.All = async (req, res) => {
  const data = await BrandModel.All();
  res.status(200).json(data);
};
