const path = require('path');
const products = require('../data/products.json');
const fs = require('fs');
const mainController = {

    productsArr: () => {
        let readed = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8');
        return JSON.parse(readed);
    },

    CreateNewProduct: (name, desc, price, xs, s, m, l, xl, xxl) => {
        this.name = name;
        this.desc = desc;
        this.price = price
        this.sizesQuantity = [xs, s, m, l, xl, xxl];
    },

    home: (req, res) => {
        let productsArray = mainController.productsArr()
        let soldOut = [];
        let onSale = [];
        for (const e of productsArray.products) {
            let prev = 0;
            let stock = e.sizesQuantity.every((e) => (e == 0))
            if (stock) {
                soldOut.push(e)
            } else {
                onSale.push(e)
            }
        }
        res.render(path.join(__dirname, '../views/products/home.ejs'), { onSale, soldOut })
    },

    detalle: (req, res) => {
        let sizesList = mainController.productsArr().sizesList;
        let productsArray = mainController.productsArr().products;
        let idP = req.params.id;
        res.render(path.join(__dirname, '../views/products/detalle.ejs'), { idP, productsArray, sizesList })
    },

    design: (req, res) => {
        res.render(path.join(__dirname, '../views/products/design.ejs'))
    },

    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    register: (req, res) => {
        res.render(path.join(__dirname, '../views/users/register.ejs'))
    },

    carrito: (req, res) => {
        res.render(path.join(__dirname, '../views/products/shop-car.ejs'))
    },

    create: (req, res) => {
        res.render(path.join(__dirname, '../views/products/new-detail.ejs'))
    },

    admCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/products/admCreate.ejs'))
    },

    admCreatePost: (req, res) => {
        function CreateNewProduct(name, desc, price, xs, s, m, l, xl, xxl) {
            this.title = name;
            this.description = desc;
            this.price = price
            this.sizesQuantity = [xs, s, m, l, xl, xxl];
        }

        let newProduct = new CreateNewProduct(req.body.name_product,
            req.body.description,
            req.body.price,
            parseInt(req.body.xs),
                parseInt(req.body.s),
                parseInt(req.body.m),
                parseInt(req.body.l),
                parseInt(req.body.xl),
                parseInt(req.body.xxl)
            )
        let newElement = mainController.productsArr();
        console.log(newElement)
        let nuevoId = parseInt(newElement.products[newElement.products.length - 1].id) + 1;
        newProduct.id = nuevoId.toString();
        newElement.products.push(newProduct)
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(newElement))

        res.redirect('/');
    }

}

module.exports = mainController;