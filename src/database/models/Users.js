module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_nick: {
            type: dataTypes.STRING
        },
        user_name: {
            type: dataTypes.STRING
        },
        user_pass: {
            type: dataTypes.STRING
        },
        user_email: {
            type: dataTypes.STRING
        },
        user_admin: {
            type: dataTypes.INTEGER,
            defaultValue: 0,
        },
        user_pic:{
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'Users',
        timestamps: false,
        underscored: true
    };
    const Users = sequelize.define(alias, cols, config)

    Users.associate = (models)=> {
        Users.hasMany(models.Shirts,{
            foreignKey:{
                name:"user_id",
                allowNull:false
            }
        })

        Users.hasMany(models.Adresses),{
            as: "Adresses",
            foreignKey: "user_id",
            allowNull: false
        }

        Users.hasMany(models.Cards),{
            as: "Cards",
            foreignKey: "user_id"
        }

        Users.hasMany(models.Orders_shipping),{
            as: "Orders_shipping",
            foreignKey: "user_id"
        }

        Users.hasOne(models.Cart,{
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })
    }
    return Users
}