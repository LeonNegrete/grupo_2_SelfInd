const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { CLIENT_RENEG_LIMIT } = require('tls');

const db = require('../database/models');
const sequelize = db.sequelize;

const userController = {

    usersObj: () => {
        let readed = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'); //Se le asigna el JSON a la variable readed
        let obj = JSON.parse(readed); //Se transforma de JSON a objeto literal        
        return obj; //se retorna la lista
    },

    login: (req, res) => {
        let recordar = req.cookies.last_account;
        let session = req.session;

        res.render(path.join(__dirname, '../views/users/login.ejs'), {session,recordar})
    },

    loginPost: (req,res) => {
        let listado = userController.usersObj();
        let loginStatus = false
        for ( user of listado.users){
            
            if (user.email == req.body.email){
                if (bcrypt.compareSync(req.body.password, user.password)){
                    req.session.loginStatus = true;
                    req.session.username = user.username;
                    req.session.profile = user.profile;
                    req.session.email = user.email;
                    if (req.body.recordar){
                        res.cookie('last_account', req.body.email, {maxAge: 60000 })
                    }
                }
            }
        }
        
        req.session.loginStatus ? res.redirect('/'): res.redirect('/user/login');

    },


    register: (req, res) => {
        let session = req.session;
        
        res.render(path.join(__dirname, '../views/users/register.ejs'), { session })
    },

    registerPost: (req, res) => {
        console.log(req.body)
        if (req.file) {
            var prof = req.file.filename
        } else { var prof = 'default.png' }

        db.Users.create({
            user_name: req.body.name,
            user_nick: req.body.username,
            user_email: req.body.email,
            user_pass: bcrypt.hashSync(req.body.password, 10),
            user_pic: prof
    })
        console.log("USUARIO REGISTRADO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        res.redirect('/user/list');
    },

    list: (req, res) => {
        let session = req.session;
        /* let listado = userController.usersObj().users; */
        let listado = db.find
        res.render(path.join(__dirname, '../views/users/list.ejs'), { listado, session })
    },

    profile: (req, res) => {
        let session = req.session;
        
        res.render(path.join(__dirname, '../views/users/profile.ejs'), {session})
    }, 

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }    
}

module.exports = userController;