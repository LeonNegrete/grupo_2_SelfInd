const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const path = require('path');
const { check, body } = require('express-validator');
const db = require('../database/models')
//MIDDLEWARE CUSTOM
const sessionGuestMD = require('../middleware/sessionGuestMD');
const sessionUserMD = require('../middleware/sessionUserMD');

//MIDDLEWARE MULTER
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

//MIDDLEWARE EXPRESS_VALIDATOR     (Estandarizar mensajes)
let validateRegister = [
    check('name').notEmpty().withMessage('Debes ingresar nombre').bail()
        .isLength({ min: 2 }).withMessage('Tu nombre debe tener al menos 2 caracteres'),
    check('username').notEmpty().withMessage('Debes ingresar nombre').bail()
        .isLength({ min: 4 }).withMessage('Tu nombre de usuario debe tener al menos 4 caracteres'),
    check('email').notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email valido'),
     /* body('email').custom(async value => {
        return await db.Users.findAll({ where: { user_email: value } }).then(user => {
            if (user) {
                return Promise.reject('Ya existe un usuario con este email');
            }
        });
    }) */, 
    check('password').notEmpty().withMessage('Ingresa contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false })
        .withMessage('La contraseña debe contener al menos una mayuscula, minuscula, simbolo y numero')
]
let validateLogin = [
    check('email').notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email valido'),
    check('password').notEmpty().withMessage('Ingresa contraseña')
]


//RUTAS A LAS QUE ENTRAR SOLO SI NO SE ESTA LOGEADO
router.get('/login', sessionGuestMD, userController.login)
router.get('/register', sessionGuestMD, userController.register)
router.post('/', sessionGuestMD, upload.single('profile'), validateRegister, userController.registerPost)
router.post('/login', sessionGuestMD, upload.single('profile'), validateLogin, userController.loginPost)

//RUTA QUE SIEMPRE SE PUEDE ENTRAR
router.get('/list', userController.list) //Hacer visible SOLO para admin despues

// RUTAS A INGRESAR SOLO SI SE ESTA LOGEADO
router.get('/profile', sessionUserMD, userController.profile)
router.get('/logout', sessionUserMD, userController.logout)


module.exports = router;