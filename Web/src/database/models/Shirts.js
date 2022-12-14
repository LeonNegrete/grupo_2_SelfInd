module.exports = (sequelize, dataTypes) => {
    let alias = 'Shirts';
    let cols = {
        shirt_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shirt_price: {
            type: dataTypes.DOUBLE
        },
        shirt_discount: {
            type: dataTypes.INTEGER
        },
        shirt_name: {
            type: dataTypes.STRING
        },
        shirt_desc: {
            type: dataTypes.TEXT    
        },
        shirt_img: {
            type: dataTypes.STRING
        },
        shirt_custom: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'Shirts',
        timestamps: true,
        createdAt: "shirt_created_time"
    };
    const Shirts = sequelize.define(alias, cols, config)

    Shirts.associate =  (models) => {
        Shirts.belongsTo(models.Users, { 
            as: "Users",
            foreignKey: "user_id"
        }),

        Shirts.hasMany(models.Details_shirt, { 
            as: "Details_shirt", 
            foreignKey: "shirt_id"
        })

    }
    return Shirts
}