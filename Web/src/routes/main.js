const express = require("express");
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
const router = express.Router()

router.get('/', productController.home)
router.get('/home', productController.home)
router.get('/detalle/:id', productController.detalle)
router.get('/design', productController.design)
router.get('/carrito', productController.carrito)
router.get('/create', productController.create)
router.get('/admCreate', productController.admCreate)
router.get('/admEdit', productController.admEdit);
router.post('/admCreate', productController.admCreatePost)


router.get('/login', userController.login )
router.get('/register', userController.register)

module.exports = router;