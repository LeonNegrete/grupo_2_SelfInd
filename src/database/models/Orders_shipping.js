module.exports = (sequelize, dataTypes) => {
    let alias = 'Orders_shipping';
    let cols = {
        order_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        //order_date: {
          //  type: dataTypes.TIMESTAMP
        //},
        order_status: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'Orders_shipping',
        timestamps: true,
        createdAt: "order_date"
    };
    const Orders_shipping = sequelize.define(alias, cols, config)

    Orders_shipping.associate =  (models) => {
        Orders_shipping.belongsTo(models.Users, { 
            as: "Users",
            foreignKey: "user_id"
        }),

        Orders_shipping.belongsTo(models.Cart, { 
            as: "Cart",
            foreignKey: "cart_id"
        }),

        Orders_shipping.belongsTo(models.Adresses, { 
            as: "Adresses",
            foreignKey: "address_id"
        }),

        Orders_shipping.belongsTo(models.Cards, { 
            as: "Cards",
            foreignKey: "card_id"
        })

    }
    return Orders_shipping
}