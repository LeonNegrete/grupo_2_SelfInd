const express = require("express");
const mainController = require("../controllers/mainController")
const router = express.Router()

router.get('/', mainController.homeRD)
router.get('/home', mainController.home)
router.get('/detalle', mainController.detalle)
router.get('/design', mainController.design)
router.get('/login', mainController.login )
router.get('/register', mainController.register)
router.get('/carrito', mainController.carrito)

module.exports = router;