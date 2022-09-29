const path = require('path');
 const mainController = {
    homeRD:(req,res)=>{
        res.redirect('/home');
    },

    home: (req, res) => {
        res.render(path.join(__dirname, '../views/home.ejs'))
    },

    detalle: (req, res)=>{
        res.render(path.join(__dirname, '../views/detalle.ejs'))
    },
    
    design: (req, res)=>{
        res.render(path.join(__dirname, '../views/design.ejs'))
    },

    login: (req, res)=>{
        res.render(path.join(__dirname, '../views/login.ejs'))
    },

    register:(req, res)=>{
        res.render(path.join(__dirname, '../views/register.ejs'))
    },

    carrito:(req, res)=>{
        res.render(path.join(__dirname, '../views/shop-car.ejs'))
    }

}

module.exports = mainController;