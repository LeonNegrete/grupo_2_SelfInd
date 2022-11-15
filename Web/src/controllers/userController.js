const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs')
const userController = {

    usersObj: () => {
        let readed = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'); //Se le asigna el JSON a la variable readed
        let obj = JSON.parse(readed); //Se transforma de JSON a objeto literal        
        return obj; //se retorna la lista
    },

    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    register: (req, res) => {
        res.render(path.join(__dirname, '../views/users/register.ejs'))
    },

    list: (req, res) => {
        let listado = userController.usersObj().users;
        res.render(path.join(__dirname, '../views/users/list.ejs'), { listado })
    },

    registerPost: (req, res) => {
        let listado = userController.usersObj();
        console.log(req.body)
        if (req.file) {
            var prof = req.file.filename
        } else { var prof = 'default.png' }
        let nuevoUser = {
            id: (parseInt(listado.users[listado.users.length - 1].id) + 1),
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            profile: prof
        }
        listado.users.push(nuevoUser)
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(listado))

        res.redirect('/user/list');
    }
}

module.exports = userController;