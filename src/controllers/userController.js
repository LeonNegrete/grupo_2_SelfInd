const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

const userController = {

    getSession: async (req, res) => {
        return req.session.data
    },


    login: async (req, res) => {
        let recordar = req.cookies.last_account;
        try {
            let session = userController.getSession(req, res)
            res.render(path.join(__dirname, '../views/users/login.ejs'), { session, recordar, errors: {}, urlForPost: req.originalUrl })
        } catch (error) {
            console.log(error)
        }
    },

    loginPost: async (req, res) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render(path.join(__dirname, '../views/users/login.ejs'), { errors: errors.mapped(), session: userController.getSession(req, res), urlForPost: req.originalUrl })
        } else {

            try {
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
                if ((search && bcrypt.compareSync(inputPass, search.user_pass))) {
                    let data = {
                        expires: new Date(Date.now() + 48 * 60 * 60 * 1000),
                        loginStatus: true,
                        username: search.user_nick,
                        profile: search.user_pic,
                        email: search.user_email,
                        userid: search.user_id,
                        admin: search.user_admin,
                    }
                    const session = await db.Sessions.findOne({ where: { sid: req.sessionID } });
                    if (!session) {
                        throw new Error(`Session with id ${req.sessionID} not found`);
                    }
                    let updatedData = JSON.parse(session.data)
                    updatedData.data = data
                    console.log(updatedData)
                    session.data = JSON.stringify(updatedData)
                    await session.save();
                    if (req.body.recordar) {
                        res.cookie('last_account', search.user_email, { maxAge: 60000 })
                    }
                    req.query.redirect ? res.redirect(req.query.redirect) : res.redirect('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
    },


    register: async (req, res) => {
        let session = userController.getSession(req, res);

        res.render(path.join(__dirname, '../views/users/register.ejs'), { session, errors: undefined })
    },

    registerPost: async (req, res) => {
        let errors = validationResult(req)
        let session = await userController.getSession(req, res);

        if (!errors.isEmpty()) {
            res.render(path.join(__dirname, '../views/users/register.ejs'), { errors: errors.mapped(), session })
        } else {
            try {
                if (req.file) {
                    var prof = req.file.filename
                } else { var prof = 'default.png' }

                await db.Users.create({
                    user_name: req.body.name,
                    user_nick: req.body.username,
                    user_email: req.body.email,
                    user_pass: bcrypt.hashSync(req.body.password, 10),
                    user_pic: prof
                })

                let createdUser = await db.Users.findOne({
                    where: {user_email: req.body.email,}
                })

                console.log( createdUser.dataValues.user_id)
                await db.Cart.create({
                    cart_total: 0,
                    user_id: createdUser.dataValues.user_id
                })

                res.redirect('/user/list');
            } catch (err) {
                console.log(err)
            }
        }

    },

    list: async (req, res) => {
        try {
            let session = userController.getSession(req, res);
            db.Users.findAll().then((listado) => {
                res.render(path.join(__dirname, '../views/users/list.ejs'), { listado, session })
            })
        } catch (error) {
            console.log(error)
        }
    },

    profile: async (req, res) => {
        try {
            let session = await userController.getSession(req, res)
            console.log(session)
            res.render(path.join(__dirname, '../views/users/profile.ejs'), { session })

        } catch (error) {
            console.log(error)
        }
    },

    logout: async (req, res) => {
        try {
            let session = await userController.getSession(req, res)
            await db.Sessions.destroy({
                where: {
                    sid: req.sessionID
                }
            });
            res.redirect('/')

        } catch (error) {
            console.log('no se pudo borrar la sesion', error)
        }
    }
}

module.exports = userController;
