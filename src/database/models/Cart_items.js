module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart_Items';
    let cols = {
        cart_item_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_item_quantity: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'Cart_Items',
        timestamps: false
    };
    const Cart_Items = sequelize.define(alias, cols, config)

    Cart_Items.associate =  (models) => {
        Cart_Items.hasOne(models.Cart, { 

            foreignKey: "cart_id"
        })

        Cart_Items.hasOne(models.Shirts, { 

            foreignKey: "shirt_id"
        })

    }
    return Cart_Items
}