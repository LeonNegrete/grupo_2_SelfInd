module.exports = (sequelize, dataTypes) => {
    let alias = 'Adresses';
    let cols = {
        address_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address_num: {
            type: dataTypes.INTEGER
        },
        address_calle: {
            type: dataTypes.STRING
        },
        address_cp: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'Adressess',
        timestamps: false
    };
    const Adresses = sequelize.define(alias, cols, config)

    Adresses.associate =  (models) => {
        Adresses.belongsTo(models.Users, { 
            as: "Users",
            foreignKey: "user_id"
        }),

        Adresses.hasMany(models.Orders_shipping),{
            as: "Orders_shipping",
            foreignKey: "address_id"
        }

    }
    return Adresses
}