const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const userAPIController = {
    allUsers: async (req,res)=>{
        let users = await db.Users.findAll();
        let response = {
            count: users.length,
            users: users.map((user)=>{
                return {
                    id: user.user_id,
                    name: user.user_nick,
                    email: user.user_email,
                    detail:'/profile/' + user.user_id //los profile no tienen id y solo se accede a travez del session
                }
            })
        }
        res.json(response);
    },
    detail: async (req,res)=>{
        let user = await db.Users.findByPk(req.params.id)
        result = {...user.dataValues}
        delete result.user_pass
        delete result.user_admin
        result.user_pic = path.join(__dirname,'../../../public/images/users/') + user.user_pic 
        res.json(result)
    }
}
module.exports = userAPIController;