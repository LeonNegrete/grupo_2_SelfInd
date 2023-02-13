const sessionUserMD = (req,res,next) => {
    
    if ((req.session.data)&&(req.session.data.loginStatus)) {
        next();
    } else {
        res.redirect('/user/login?redirect='+req.originalUrl);
    }
}
module.exports = sessionUserMD