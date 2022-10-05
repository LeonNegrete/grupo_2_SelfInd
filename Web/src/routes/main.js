const express = require("express");
const mainController = require("../controllers/mainController")
const router = express.Router()

router.get('/', mainController.home)
router.get('/home', mainController.home)
router.get('/detalle/:id', mainController.detalle)
router.get('/design', mainController.design)
router.get('/login', mainController.login )
router.get('/register', mainController.register)
router.get('/carrito', mainController.carrito)
router.get('/create', mainController.create)
router.get('/admCreate', mainController.admCreate)

module.exports = router;