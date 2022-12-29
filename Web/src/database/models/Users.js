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
        timestamps: false
    };
    const Users = sequelize.define(alias, cols, config)

    Users.associate = (models)=> {
        Users.hasMany(models.Shirts, { 
            as: "Shirts", 
            foreignKey: "user_id"
        })
    }
    return Users
}