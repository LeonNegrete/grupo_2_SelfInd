const { dirname } = require('path');
const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const fs = require('fs');
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
        try{
            let product = await db.Shirts.findByPk(req.params.id)
            let result = await {...product.dataValues}
            result.shirt_img = await  'http://localhost:3030/images/Remeras/' + product.shirt_img 
            result.delete = await 'http://localhost:3030/products' + product.shirt_id + '?_method=DELETE'
            await res.json(result)
        }catch(err){
            console.log(err)
        }

    },
    deleteDetail: async(req,res)=>{
        let idShirt = req.params.id;

        let shirtToDelete = await db.Shirts.findByPk(idShirt);

        fs.unlinkSync(path.join(__dirname, ('../../../public/images/Remeras/' + shirtToDelete.shirt_img)));

        await db.Details_shirt.destroy(
            {
                where: { shirt_id: idShirt, }
            });

        await db.Shirts.destroy(
            {
                where: { shirt_id: idShirt, }
            });
        res.redirect(req.headers.referer)        
    }
}
module.exports = productsAPIController;