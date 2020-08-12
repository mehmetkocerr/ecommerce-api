const ProductModel = require('../model/ProductModel.js');

exports.All = async (req, res) => {
  const data = await ProductModel.All();
  res.status(200).json(data);
};

exports.Product = async (req, res) => {
  await ProductModel.Product(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(...result);
      } else {
        res.status(404).send('Ürün Bulunamadı.');
      }
    })
    .catch((err) => {
      res.status(404).send('Eror!');
    });
};
exports.ProductDescription = async (req, res) => {
  await ProductModel.ProductDescription(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send('Ürün Bulunamadı.');
      }
    })
    .catch((err) => {
      res.status(404).send('Eror!');
    });
};
exports.ProductImages = async (req, res) => {
  await ProductModel.ProductImages(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send('Ürün Bulunamadı.');
      }
    })
    .catch((err) => {
      res.status(404).send('Eror!');
    });
};

exports.ProductCategories = async (req, res) => {
  const categories = [];
  await ProductModel.ProductCategories(req.params.id)
    .then((result) => {
      if (result) {
        for (var i = 0; i < result.length; i++) {
          categories.push(result[i].categoryId); //some game data
        }
        res.status(200).json(categories);
      } else {
        res.status(404).send('Ürün Bulunamadı.');
      }
    })
    .catch((err) => {
      res.status(404).send('Eror!');
    });
};
