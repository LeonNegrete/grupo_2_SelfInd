const path = require('path');
 const mainController = {
    homeRD:(req,res)=>{
        res.redirect('/home');
    },

    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/home.html'))
    },

    detalle: (req, res)=>{
        res.sendFile(path.join(__dirname, '../views/detalle.html'))
    },
    
    design: (req, res)=>{
        res.sendFile(path.join(__dirname, '../views/design.html'))
    },

    login: (req, res)=>{
        res.sendFile(path.join(__dirname, '../views/login.html'))
    },

    register:(req, res)=>{
        res.sendFile(path.join(__dirname, '../views/register.html'))
    },

    carrito:(req, res)=>{
        res.sendFile(path.join(__dirname, '../views/shop-car.html'))
    }

}

module.exports = mainController;