module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        cart_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_total: {
            type: dataTypes.DOUBLE
        }
        //cart_created_time: {
            //Timestamp sequelize version 2 para pruebas
            //type: dataTypes.TIMESTAMP,
            //defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            //allowNull: false
        //}

    };
    let config = {
        tableName: 'Cart',
        timestamps: false,
        createdAt: "cart_created_time"
    };
    const Cart = sequelize.define(alias, cols, config)

    Cart.associate =  (models) => {
        Cart.belongsTo(models.Users, { 
            as: "Users",
            foreignKey: "user_id"
        }),

        Cart.hasMany(models.Cart_items),{
            as: "Cart_items",
            foreignKey: "cart_id"
        },

        Cart.hasMany(models.Orders_shipping),{
            as: "Orders_shipping",
            foreignKey: "cart_id"
        }

    }
    return Cart
}