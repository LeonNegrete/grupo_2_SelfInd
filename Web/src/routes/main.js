const express = require("express");
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
const router = express.Router()
const path = require('path');
const { check } = require('express-validator');


const multer  = require('multer')

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/Remeras')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

// Express-validator
let validateCreate = [
    check('name_product').notEmpty().withMessage('Completar campo nombre').bail()
    .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').notEmpty().withMessage('Completar campo descripcion').bail()
    .isLength({min:20}).withMessage('La descripcion debe tener al menos 20 caracteres')
]




//HOME (PARA ENTRAR LOGUEADO O NO)
router.get('/', productController.home)
router.get('/home', productController.home)

//ADMINISTRACION (PARA ADMINS)
router.get('/products', productController.productList ); 
router.get('/products/create', productController.admCreate)
router.get('/products/:id', productController.detalle)
router.post('/products',upload.single('image'),validateCreate, productController.admCreatePost)
router.get('/products/edit/:id', productController.admEdit);
router.put('/products/:id',upload.single('image'),validateCreate, productController.putEdit);
router.delete('/products/:id', productController.deleteItem )

//PRODUCTOS (PARA ENTRAR LOGUEADO O NO)
router.get('/design', productController.design)
router.get('/carrito', productController.carrito)



module.exports = router;