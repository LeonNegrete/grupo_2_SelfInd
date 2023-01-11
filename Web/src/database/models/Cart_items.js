module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart_items';
    let cols = {
        cart_item_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_item_price: {
            type: dataTypes.DOUBLE
        },
        cart_item_quantity: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'Cart_items',
        timestamps: false
    };
    const Cart_items = sequelize.define(alias, cols, config)

    Cart_items.associate =  (models) => {
        Cart_items.belongsTo(models.Cart, { 
            as: "Cart",
            foreignKey: "cart_id"
        }),

        Cart_items.belongsTo(models.Shirts, { 
            as: "Shirts",
            foreignKey: "shirt_id"
        })

    }
    return Cart_items
}