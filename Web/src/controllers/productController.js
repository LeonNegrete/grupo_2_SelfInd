const path = require('path');
const products = require('../data/products.json');
const fs = require('fs');
const productController = {
    //Funcion destinada a traer el JSON 'Products' y transformarlo en un objeto literal
    productsArr: () => {
        let readed = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8'); //Se le asigna el JSON a la variable readed
        return JSON.parse(readed); //Se transforma de JSON a objeto literal
    },

    //Funcion constructora encargada de construir los objetos que representaran las remeras.
    CreateNewProduct: (name, desc, price, xs, s, m, l, xl, xxl) => {
        this.name = name;
        this.desc = desc;
        this.price = price
        this.sizesQuantity = [xs, s, m, l, xl, xxl];
    },

    home: (req, res) => {
        let productsArray = productController.productsArr() 
        let soldOut = [];
        let onSale = [];
        for (const e of productsArray.products) { //itera el array pasando por cada remera
            let stock = e.sizesQuantity.every((e) => (e == 0)) //evalua si todos los elementos del array que contiene el stock estan en cero
            if (stock) {
                soldOut.push(e) //Si estan en cero se los agrega al array de vendidos
            } else {
                onSale.push(e) //Caso contrario se los agrega al array de disponibles
            }
        }
        res.render(path.join(__dirname, '../views/products/home.ejs'), { onSale, soldOut }) //Se exportan los arrays de vendidos y disponibles
    },

    detalle: (req, res) => {
        let sizesList = productController.productsArr().sizesList; //Se trae el array con la lista de talles que puede tener cada remera
        let productsArray = productController.productsArr().products;//Se trae el array con la lista que contiene a todas las remeras
        let idP = req.params.id; //se trae a la id ingresada en la url
        res.render(path.join(__dirname, '../views/products/detalle.ejs'), { idP, productsArray, sizesList })
    },

    design: (req, res) => {
        res.render(path.join(__dirname, '../views/products/design.ejs'))
    },

    carrito: (req, res) => {
        res.render(path.join(__dirname, '../views/products/shop-car.ejs'))
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
        let newElement = productController.productsArr();
        console.log(newElement)
        let nuevoId = parseInt(newElement.products[newElement.products.length - 1].id) + 1;
        newProduct.id = nuevoId.toString();
        newElement.products.push(newProduct)
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(newElement))

        res.redirect('/');
    },
    admEdit: (req, res) => {
        res.render(path.join(__dirname, '../views/products/admEdit.ejs'))
    }
}

module.exports = productController;