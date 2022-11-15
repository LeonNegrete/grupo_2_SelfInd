const express = require("express");
const userController = require("../controllers/userController")
const router = express.Router()
const path = require('path');

const multer  = require('multer')
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

//aqui van las nuevas rutas


//CREAR Y ACCEDER
router.get('/login', userController.login )
router.get('/register', userController.register)
router.post('/',upload.single('profile'), userController.registerPost)
//LISTAR
router.get('/list', userController.list)
//

module.exports = router;