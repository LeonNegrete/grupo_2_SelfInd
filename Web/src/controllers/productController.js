const path = require('path');
const products = require('../data/products.json');
const fs = require('fs');
const db = require('../database/models');
/* const { removeTicks } = require('sequelize/types/utils'); */ // me pa que esto no tiene que estar aca
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const productController = {
    //Funcion destinada a traer el JSON 'Products' y transformarlo en un objeto literal
    productsArr: () => {
        let readed = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8'); //Se le asigna el JSON a la variable readed
        return JSON.parse(readed); //Se transforma de JSON a objeto literal
    },

    editExistingProduct: (producto, newData) => {
        producto.id = newData.id || producto.id;
        producto.title = newData.title || producto.title;
        producto.description = newData.description || producto.description;
        producto.price = newData.price || producto.price;
        producto.sizesQuantity = newData.sizesQuantity || producto.sizesQuantity;
        producto.image = newData.image || producto.image;
    },

    hayStock: async(Remera) => {
        let talles = await db.Details_shirt.findAll({
            where: {
                shirt_id : Remera.dataValues.shirt_id
            }
        })
        talles.forEach(talle => {
            let stock = false
            if (talle.dataValues.shirt_stock > 0){
                return true
            }
            return stock;
        });
    },

    home: async(req, res) => {
        let session = req.session;
        let productsArray = await db.Shirts.findAll()
        console.log(productsArray)
        let soldOut = [];
        let onSale = [];
        for (const remera of productsArray) { //itera el array pasando por cada remera
            if (productController.hayStock(remera)) {
                onSale.push(remera) 
            } else {
                soldOut.push(remera) 
            }
        }
        res.render(path.join(__dirname, '../views/products/home.ejs'), { onSale, soldOut, session }) //Se exportan los arrays de vendidos y disponibles
    },

    detalle: async (req, res) => {
        
        let session = req.session;
        let idShirt = req.params.id;
        try{
            let shirtShow = await db.Shirts.findByPk(idShirt);

            let talles = await db.Details_shirt.findAll({
                where: {
                  shirt_id : idShirt
                }
            });

            console.log(shirtShow.dataValues.shirt_img)

            res.render(path.join(__dirname,'../views/products/detalle.ejs'), {shirtShow, talles,session});

        }catch(err){
            console.log(err);
        }
    },

    design: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/products/design.ejs'), { session })
    },

    carrito: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/products/shop-car.ejs'), { session })
    },

    admCreate: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/products/admCreate'), { session, errors: 'undefined' })
    },

    admCreatePost: async (req, res) => {
        let errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            res.render(path.join(__dirname, '../views/products/admCreate'), { session:req.session, errors: errors.mapped() })
        }else{

            try{
                let shirtToCreate = await db.Shirts.findOne({ where : { shirt_name : req.body.name_product } })
                
                if( shirtToCreate != null){
                    res.redirect('/products/create')
                    console.log("CAMISA YA EXISTENTE") //Hay que poner los errores con un render errors...
                }else{
                    await db.Shirts.create({
                        shirt_name: req.body.name_product,
                        shirt_price: req.body.price,
                        shirt_discount: req.body.descuento,
                        shirt_desc: req.body.description,
                        shirt_img: req.file.filename,
                        shirt_custom: req.session.admin,
                        user_id: req.session.userid
                    })
        
                    let stock = { 
                        "XS" : req.body.XS,
                        "S" : req.body.S,
                        "M" : req.body.M,
                        "L" : req.body.L,
                        "XL" : req.body.XL,
                        "XXL" : req.body.XXL
                    }
                
                    let shirtCreated = await db.Shirts.findOne({ where : { shirt_name : req.body.name_product } })
        
                    for (let talla in stock){
                        await db.Details_shirt.create({
                            shirt_size: talla,
                            shirt_stock: stock[talla],
                            shirt_id: shirtCreated.shirt_id
                        })
                    } 
                    res.redirect(`/products/${shirtCreated.shirt_id}`);
                }
            
            }catch(err){
                console.log(err)
                res.redirect('/');
            }
        }
    },

    admEdit: (req, res) => {
        let idP = req.params.id;
        let selectedProduct = productController.productsArr().products[idP]
        res.render(path.join(__dirname, '../views/products/admEdit.ejs'), { idP, selectedProduct });
    },
    putEdit: (req, res) => {
        let idP = req.params.id
        let editedData = {
            ...req.body,
        }
        let arrayEvaluacion = [req.body.xs, req.body.s, req.body.m, req.body.l, req.body.xl, req.body.xxl]
        if ([req.body.xs, req.body.s, req.body.m, req.body.l, req.body.xl, req.body.xxl].every((e) => {
            return isNaN(parseInt(e));
        })) { //Condicional necesario para no sobreescribir los datos de stock con un 'null' cada vez que se hace una edicion donde no se especifica el stock (la idea es que se asume que si no se especifica un dato en el formulario es debido a que no se quiere cambiarlo)
            editedData.sizesQuantity = undefined //Cuando se sube un undefined, en la funcion edictExistingProduct, se conservara el valor actual
        } else { editedData.sizesQuantity = [req.body.xs, req.body.s, req.body.m, req.body.l, req.body.xl, req.body.xxl]; } //Si se hizo un cambio se subira   

        let parsedJSON = productController.productsArr(); //Almacena el JSON convertido en objeto dentro de una variable
        let elementToEdit = parsedJSON.products.find((e) => { //Busca el producto de manera que lo encuentre satisfactoriamente aunque el indice del array no sea el mismo que su id
            return e.id === idP
        })
        productController.editExistingProduct(elementToEdit, editedData) //edita el parsedJSON
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(parsedJSON));
        res.redirect('/');
    },

    productList: (req, res) => {
        let session = req.session;
        let productsArray = productController.productsArr().products
        let sizesList = productController.productsArr().sizesList
        res.render(path.join(__dirname, '../views/products/products.ejs'), { productsArray, sizesList, session })
    },

    deleteItem: (req, res) => {
        let idP = req.params.id;
        let arrayToReturn = productController.productsArr(); //selecciona el elemento correspondiente
        let elementToDelete = arrayToReturn.products.find((e) => { //Busca el producto de manera que lo encuentre satisfactoriamente aunque el indice del array no sea el mismo que su id
            return e.id === idP
        })
        let indexOfElementToDelete = arrayToReturn.products.indexOf(elementToDelete);
        arrayToReturn.products.splice(arrayToReturn.products.indexOf(indexOfElementToDelete), 1);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(arrayToReturn));
        console.log(elementToDelete.image.replace('../images/Remeras/', ''))
        fs.unlinkSync(path.join(__dirname, ('../../public/images/Remeras/' + elementToDelete.image)));
        res.redirect('/products')
    }
}

module.exports = productController;