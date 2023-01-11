module.exports = (sequelize, dataTypes) => {
    let alias = 'Cards';
    let cols = {
        card_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        card_num: {
            type: dataTypes.INTEGER
        },
        card_ccv: {
            type: dataTypes.STRING
        },
        card_expire: {
            type: dataTypes.DATE
        },
        card_holder: { 
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'Cards',
        timestamps: false
    };
    const Cards = sequelize.define(alias, cols, config)

    Cards.associate =  (models) => {
        Cards.belongsTo(models.Users, { 
            as: "Users",
            foreignKey: "user_id"
        })

    }
    return Cards
}