const { dirname } = require('path');
const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const productsAPIController = {
    allProducts: async (req,res)=>{
        let products = await db.Shirts.findAll();
        let result = {
            countOficial:0,
            countCustom:0
        }
        products.forEach(product => {
            product.shirt_custom === 0 ? result.countOficial++ : result.countCustom ++
        });
        let response = {
            count: products.length,
            countByCategory: result,
            products: products.map((product)=>{
                return {
                    id: product.shirt_id,
                    name: product.shirt_name,
                    description: product.shirt_desc,
                    created: product.shirt_custom === 0 ? 'Oficial' : 'Custom' ,
                    detail:'http://localhost:3030/products/' + product.shirt_id
                }
            })
        }
        res.json(response);
    },
    detail: async (req,res)=>{
        let product = await db.Shirts.findByPk(req.params.id)
        result = {...product.dataValues}
        result.shirt_img = 'http://localhost:3030/images/Remeras/' + product.shirt_img //El dirname hace que arranque desde el path de apis (Tiene que arrancar desde la raiz)
        res.json(result)
    }
}
module.exports = productsAPIController;