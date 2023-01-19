const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { validationResult } = require('express-validator');
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

        res.render(path.join(__dirname, '../views/users/login.ejs'), {session,recordar,errors: {}})
    },

    loginPost: async (req,res) => {
        let errors = validationResult(req)

        if(!errors.isEmpty()){
            console.log(errors.mapped())
            res.render(path.join(__dirname, '../views/users/login.ejs'), { errors: errors.mapped(), session: req.session })
        }else{
    
        try{
            let inputName = req.body.email
            let inputPass = req.body.password
            
            let search = await db.Users.findOne({
                where: {
                    user_email: inputName
                    /* [Op.or]: [
                        {
                            user_email:{
                                [Op.eq]:inputName
                            }
                        },
                        {
                            user_nick:{
                                [Op.eq]:inputName
                            }
                        }
                    ] */
                }
            })
            if (search){
                
                if (bcrypt.compareSync(inputPass, search.user_pass)){
                    req.session.loginStatus = true;
                    req.session.username = search.user_nick;
                    req.session.profile = search.user_pic;
                    req.session.email = search.user_email;
                    req.session.userid = search.user_id;
                    req.session.admin = search.user_admin;
                    if (req.body.recordar){
                        res.cookie('last_account', search.user_email, {maxAge: 60000 })
                    }
                }else{
                    req.session.loginStatus = false;
                }
            }else{
                req.session.loginStatus = false;
            }

            req.session.loginStatus ? res.redirect('/'): res.render(path.join(__dirname, '../views/users/login.ejs'), { errors: {err:{msg:'Credenciales invalidas'}}, session: req.session }); 
        
        }catch(error){
            console.log(error)
        }
    }
    },


    register: (req, res) => {
        let session = req.session;
        
        res.render(path.join(__dirname, '../views/users/register.ejs'), { session, errors: undefined })
    },

    registerPost: (req, res) => {
        let errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            res.render(path.join(__dirname, '../views/users/register.ejs'), { errors: errors.mapped(), session: req.session })
        }else{
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
        }

    },

    list: (req, res) => {
        let session = req.session;
        /* let listado = userController.usersObj().users; */
        db.Users.findAll().then((listado)=>{
            res.render(path.join(__dirname, '../views/users/list.ejs'), { listado, session })
        })
        
        
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