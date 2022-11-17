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


//RUTAS A LAS QUE ENTRAR SOLO SI NO SE ESTA LOGEADO
router.get('/login', userController.login )
router.get('/register', userController.register)
router.post('/',upload.single('profile'), userController.registerPost)
router.post('/login',upload.single('profile'), userController.loginPost)
//RUTA QUE SIEMPRE SE PUEDE ENTRAR
router.get('/list', userController.list)
// RUTAS A INGRESAR SOLO SI SE ESTA LOGEADO
router.get('/profile', userController.profile)


module.exports = router;