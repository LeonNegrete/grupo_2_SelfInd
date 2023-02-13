const path = require('path');

const fs = require('fs');
const db = require('../database/models');
/* const { removeTicks } = require('sequelize/types/utils'); */ // me pa que esto no tiene que estar aca
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const productController = {

    getSession: (req, res) => {
        return req.session.data

        /* try {
          let session = await db.Sessions.findOne({ where: { sid: req.sessionID } });
          return session ? JSON.parse(session.data) : {};
        } catch (error) {
          console.log(error);
          return {};
        } */
    },

    editExistingProduct: (producto, newData) => {
        producto.id = newData.id || producto.id;
        producto.title = newData.title || producto.title;
        producto.description = newData.description || producto.description;
        producto.price = newData.price || producto.price;
        producto.sizesQuantity = newData.sizesQuantity || producto.sizesQuantity;
        producto.image = newData.image || producto.image;
    },

    hayStock: async (Remera) => {
        let talles = await db.Details_shirt.findAll({
            where: {
                shirt_id: Remera.dataValues.shirt_id
            }
        })
        tallesInStock = talles.filter((talle) => {
            return talle.dataValues.shirt_stock > 0
        })

        return tallesInStock
    },

    home: async (req, res) => {
        try {
            let session = productController.getSession(req, res)
            let productsArray = await db.Shirts.findAll()
            let soldOut = [];
            let onSale = [];

            for (const remera of productsArray) {

                let aux = await productController.hayStock(remera)
                if (aux.length !== 0) {
                    onSale.push(remera)
                } else {
                    soldOut.push(remera)
                }
            }
            res.render(path.join(__dirname, '../views/products/home.ejs'), { onSale, soldOut, session }) //Se exportan los arrays de vendidos y disponibles

        } catch (error) {
            console.log(error)
        }
    },

    detalle: async (req, res) => {

        let session = req.session.data;
        let idShirt = req.params.id;
        try {
            let shirtShow = await db.Shirts.findByPk(idShirt);
            inStock = await productController.hayStock(shirtShow);


            let talles = await db.Details_shirt.findAll({
                where: {
                    shirt_id: idShirt
                }
            });

            res.render(path.join(__dirname, '../views/products/detalle.ejs'), { shirtShow, inStock, talles, session });

        } catch (err) {
            console.log(err);
        }
    },

    design: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/products/design.ejs'), { session })
    },

    carrito: async (req, res) => {
        let session = req.session.data;
        try {
            let userCart = await db.Cart.findOne({
                where: {
                    user_id: req.session.data.userid
                }
            })
            let allItems = await db.Cart_Items.findAll({
                where: {
                    cart_id: userCart.cart_id
                }
            })

            let allShirts = await Promise.all(allItems.map(async (item) => {
                try {
                    return await db.Shirts.findByPk(item.shirt_id);
                } catch (error) {
                    console.log(error)
                }
            }))

            let allData = await Promise.all(allShirts.map(async (shirt) => {
                try {
                    let detailsInStock = await productController.hayStock(shirt)
                    let sizesInStock = detailsInStock.map(detail => detail.dataValues.shirt_size)

                    return sizesInStock
                } catch (err) {
                    console.log(err)
                }
            }));




            res.render(path.join(__dirname, '../views/products/shop-car.ejs'), { session, allShirts, allData, allItems })
        } catch (error) {
            console.log(error)
        }
    },


    addCart: async (req, res) => {
        let userId = req.session.data.userid
        if (!(userId)) {
            return res.send('FUCKOFF')

        }
        try {
            let userCart = await db.Cart.findOne({
                where: {
                    user_id: userId
                }
            })
            let sameProduct = await db.Cart_Items.findOne({
                where: {
                    shirt_id: req.params.id,
                    cart_id: userCart.cart_id
                }
            })
            if (sameProduct) {
                sameProduct.cart_item_quantity = sameProduct.cart_item_quantity + 1
                await sameProduct.save()
            } else {
                await db.Cart_Items.create({
                    cart_item_quantity: 1,
                    shirt_id: req.params.id,
                    cart_id: userCart.cart_id
                })
            }

            res.redirect('back');

        } catch (err) {
            console.log(err);
        }

    },

    deleteCart: async (req, res) => {
        let userId = req.session.data.userid
        console.log(userId)
        if (!(userId)) {
            return res.send('FUCKOFF')

        }
        try {

            await db.Cart_Items.destroy({
                where: {
                    cart_item_id: req.params.id
                }
            })
            res.redirect('back');

        } catch (err) {
            console.log(err);
        }
    },

    admCreate: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/products/admCreate'), { session, errors: 'undefined' })
    },

    admCreatePost: async (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            try {
                let shirtToCreate = await db.Shirts.findOne({ where: { shirt_name: req.body.name_product } })

                if (shirtToCreate != null) {
                    res.redirect('/products/create')
                    console.log("CAMISA YA EXISTENTE") //Hay que poner los errores con un render errors...
                } else {
                    if (req.session.data.admin == 1) {
                        await db.Shirts.create({
                            shirt_name: req.body.name_product,
                            shirt_price: req.body.price,
                            shirt_discount: req.body.descuento,
                            shirt_desc: req.body.description,
                            shirt_img: req.file.filename,
                            shirt_custom: 0,
                            user_id: req.session.data.userid
                        })
                    } else {
                        await db.Shirts.create({
                            shirt_name: req.body.name_product,
                            shirt_price: req.body.price,
                            shirt_discount: req.body.descuento,
                            shirt_desc: req.body.description,
                            shirt_img: req.file.filename,
                            shirt_custom: 1,
                            user_id: req.session.data.userid
                        })
                    }

                    let stock = {
                        "XS": req.body.XS,
                        "S": req.body.S,
                        "M": req.body.M,
                        "L": req.body.L,
                        "XL": req.body.XL,
                        "XXL": req.body.XXL
                    }

                    let shirtCreated = await db.Shirts.findOne({ where: { shirt_name: req.body.name_product } })

                    for (let talla in stock) {
                        await db.Details_shirt.create({
                            shirt_size: talla,
                            shirt_stock: stock[talla],
                            shirt_id: shirtCreated.shirt_id
                        })
                    }
                    res.redirect(`/products/${shirtCreated.shirt_id}`);
                }

            } catch (err) {
                console.log(err)
                res.redirect('/');
            }
        } else {
            /* res.send(errors) */
            res.render(path.join(__dirname, '../views/products/admCreate.ejs'), { errors: errors.mapped(), session: req.session.data })
        }
    },

    admEdit: async (req, res) => {
        let session = req.session.data;

        let idShirt = req.params.id;
        try {
            let shirtShow = await db.Shirts.findByPk(idShirt);
            if (shirtShow == null) {
                res.redirect('/')
                console.log("No existe la camisa") //Hay que poner los errores con un render errors...
            } else {
                let talles = await db.Details_shirt.findAll({
                    where: {
                        shirt_id: idShirt
                    }
                });

                res.render(path.join(__dirname, '../views/products/admEdit.ejs'), { shirtShow, talles, session });
            }

        } catch (err) {
            console.log(err);
        }

    },

    putEdit: async (req, res) => {

        let idShirt = req.params.id


        try {
            let shirtToEdit = await db.Shirts.findByPk(idShirt);

            if (req.file == undefined) {
                await db.Shirts.update({
                    shirt_name: req.body.title,
                    shirt_price: req.body.price,
                    shirt_discount: req.body.descuento,
                    shirt_desc: req.body.description,
                }, {
                    where: {
                        shirt_id: idShirt,
                    }
                });
            } else {
                fs.unlinkSync(path.join(__dirname, ('../../public/images/Remeras/' + shirtToEdit.shirt_img)));
                await db.Shirts.update(
                    {
                        shirt_name: req.body.title,
                        shirt_price: req.body.price,
                        shirt_discount: req.body.descuento,
                        shirt_desc: req.body.description,
                        shirt_img: req.file.filename,
                    }, {
                    where: {
                        shirt_id: idShirt,
                    }
                });

            }

            let stock = {
                "XS": req.body.XS,
                "S": req.body.S,
                "M": req.body.M,
                "L": req.body.L,
                "XL": req.body.XL,
                "XXL": req.body.XXL
            }

            for (let talla in stock) {
                await db.Details_shirt.update({
                    shirt_stock: stock[talla]
                }, {
                    where: {
                        shirt_id: idShirt,
                        shirt_size: talla
                    }
                });
            }

        } catch (err) {
            console.log(err)
        }
        res.redirect('/');

    },

    productList: async (req, res) => {
        let session = req.session;

        try {
            listado = await db.Shirts.findAll();
            tallasList = await db.Details_shirt.findAll();


            res.render(path.join(__dirname, '../views/products/products.ejs'), { listado, tallasList, session })

        } catch (err) {
            console.log(err)
        }

    },

    deleteItem: async (req, res) => {
        try {
            let idShirt = req.params.id;

            let shirtToDelete = await db.Shirts.findByPk(idShirt);


            await db.Cart_Items.destroy(
                {
                    where: { shirt_id: idShirt, }
                });
            await db.Details_shirt.destroy(
                {
                    where: { shirt_id: idShirt, }
                });

            await db.Shirts.destroy(
                {
                    where: { shirt_id: idShirt, }
                });

            if (fs.existsSync(path.join(__dirname, ('../../public/images/Remeras/' + shirtToDelete.shirt_img)))) {
                fs.unlinkSync(path.join(__dirname, ('../../public/images/Remeras/' + shirtToDelete.shirt_img)));
            }
            res.redirect('/products')

        } catch (error) {
            console.log(error)
        }
    },

    nosotros: (req, res) => {
        let session = req.session;
        res.render(path.join(__dirname, '../views/users/about.ejs'), { session });
    },

    userSubmit: async (req, res) => {
        try {
            await db.Shirts.create({
                shirt_name: req.body.name_product,
                shirt_price: 5000,
                shirt_discount: 0,
                shirt_desc: 'desc',
                shirt_img: req.file.filename,
                shirt_custom: 1,
                user_id: req.session.userid
            })

            let shirtCreated = await db.Shirts.findOne({ where: { shirt_name: req.body.name_product } })
            res.redirect(`/products/${shirtCreated.shirt_id}`);
        }

        catch (err) {
            console.log(err)
            res.redirect('/');
        }
    },
}

module.exports = productController;