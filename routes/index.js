const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const auth = require('../middlewares/verifyToken');

router.route('/products/all').post(auth, ProductController.All);

module.exports = router;
