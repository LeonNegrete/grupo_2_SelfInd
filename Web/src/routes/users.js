const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const path = require('path');

//MIDDLEWARE CUSTOM
const sessionGuestMD = require('../middleware/sessionGuestMD');
const sessionUserMD = require('../middleware/sessionUserMD');

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
router.get('/login', sessionGuestMD ,userController.login )
router.get('/register', sessionGuestMD ,userController.register)
router.post('/', sessionGuestMD, upload.single('profile'), userController.registerPost)
router.post('/login', sessionGuestMD, upload.single('profile'), userController.loginPost)

//RUTA QUE SIEMPRE SE PUEDE ENTRAR
router.get('/list', userController.list) //Hacer visible SOLO para admin despues

// RUTAS A INGRESAR SOLO SI SE ESTA LOGEADO
router.get('/profile', sessionUserMD, userController.profile)
router.get('/logout', sessionUserMD, userController.logout)


module.exports = router;