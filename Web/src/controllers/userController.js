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

    loginPost: (req,res) => {
        let listado = userController.usersObj();
        let loginStatus = false
        for ( user of listado.users){
            
            if (user.email == req.body.email){
                console.log(req.body.password)
                if (bcrypt.compareSync(req.body.password, user.password)){
                    req.session.loginStatus = true;
                    req.session.username = user.username;
                    req.session.profile = user.profile;
                    req.session.email = user.email;
                }
            }
        }
        
        req.session.loginStatus ? res.redirect('/'): res.send('Error');

    },

    register: (req, res) => {
        let session = req.session.username;
        res.render(path.join(__dirname, '../views/users/register.ejs'), {session})
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
    },

    list: (req, res) => {
        let listado = userController.usersObj().users;
        res.render(path.join(__dirname, '../views/users/list.ejs'), { listado })
    }
}

module.exports = userController;