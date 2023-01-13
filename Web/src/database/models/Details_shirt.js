module.exports = (sequelize, dataTypes) => {
    let alias = 'Details_shirt';
    let cols = {
        detail_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shirt_size: {
            type: dataTypes.STRING
        },
        shirt_stock: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'Details_shirt',
        timestamps: false
    };
    const Details_shirt = sequelize.define(alias, cols, config)

    Details_shirt.associate =  (models) => {
        Details_shirt.belongsTo(models.Users, { 
            as: "Shirts",
            foreignKey: "shirt_id"
        })

    }
    return Details_shirt
}