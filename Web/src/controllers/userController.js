const path = require('path');
const fs = require('fs');
const userController = {

    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    register: (req, res) => {
        res.render(path.join(__dirname, '../views/users/register.ejs'))
    }
}

module.exports = userController;