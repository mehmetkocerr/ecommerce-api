const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/ProductController');
const auth = require('../../middlewares/verifyToken');

router.route('/categories/all').get(auth, ProductController.ProductCategories);
module.exports = router;
