const express = require("express");
const productController = require("../controllers/productController")
const userController = require("../controllers/userController")
const router = express.Router()
const path = require('path');


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


//HOME
router.get('/', productController.home)
router.get('/home', productController.home)

//ADMINISTRACION
router.get('/products', productController.productList ); 
router.get('/products/create', productController.admCreate)
router.get('/products/:id', productController.detalle)
router.post('/products',upload.single('image'), productController.admCreatePost)
router.get('/products/:id/edit', productController.admEdit);
router.put('/products/:id',upload.single('image'), productController.putEdit);
router.delete('/products/:id', productController.deleteItem )

//PRODUCTOS
router.get('/design', productController.design)
router.get('/carrito', productController.carrito)


module.exports = router;