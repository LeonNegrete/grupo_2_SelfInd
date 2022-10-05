const path = require('path');
const products = require('../data/products.json');
const fs = require('fs');
 const mainController = {

    productsArr: () =>{
        let readed = fs.readFileSync(path.resolve(__dirname,'../data/products.json'),'utf-8');
        return JSON.parse(readed);
    },

    home: (req, res) => {
        let productsArray = mainController.productsArr()
        let soldOut = [];
        let onSale = [];
        for (const e of productsArray.products) {
            if (e.sold) {
                soldOut.push(e)
            }else{
                onSale.push(e)
            }
        }
        res.render(path.join(__dirname, '../views/products/home.ejs'), {onSale, soldOut})
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