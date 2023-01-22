const express = require("express");
const productAPI = require('../controllers/api/productAPI');
const userAPI =  require('../controllers/api/userAPI')
const router = express.Router()
const path = require('path');

router.get('/products', productAPI.allProducts);
router.get('/products/:id', productAPI.detail);

router.get('/users', userAPI.allUsers);
router.get('/users/:id', userAPI.detail);
module.exports = router;