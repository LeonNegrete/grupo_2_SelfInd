const express = require("express");
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
const router = express.Router()

//HOME
router.get('/', productController.home)
router.get('/home', productController.home)

//ADMINISTRACION
/* router.get('/products', ); listado de productos */
router.get('/products/create', productController.admCreate)
router.get('/products/:id', productController.detalle)
router.post('/products', productController.admCreatePost)
router.get('/products/:id/edit', productController.admEdit);
/* router.put('/products/:id', ); accion de edicion */
/* router.delete('/products/:id', ) accion de borrar */

//PRODUCTOS
router.get('/design', productController.design)
router.get('/carrito', productController.carrito)

//USUARIOS
router.get('/login', userController.login )
router.get('/register', userController.register)

module.exports = router;