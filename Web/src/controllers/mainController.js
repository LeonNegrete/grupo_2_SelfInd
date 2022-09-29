const path = require('path');
 const mainController = {
    homeRD:(req,res)=>{
        res.redirect('/home');
    },

    home: (req, res) => {
        res.render(path.join(__dirname, '../views/products/home.ejs'))
    },

    detalle: (req, res)=>{
        res.render(path.join(__dirname, '../views/products/detalle.ejs'))
    },
    
    design: (req, res)=>{
        res.render(path.join(__dirname, '../views/products/design.ejs'))
    },

    login: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    register:(req, res)=>{
        res.render(path.join(__dirname, '../views/users/register.ejs'))
    },

    carrito:(req, res)=>{
        res.render(path.join(__dirname, '../views/products/shop-car.ejs'))
    },

    create:(req, res)=>{
        res.render(path.join(__dirname, '../views/products/new-detail.ejs'))
    }
    

}

module.exports = mainController;