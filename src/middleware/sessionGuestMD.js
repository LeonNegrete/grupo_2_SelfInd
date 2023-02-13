const sessionGuestMD = (req,res,next) => {
    
    if ((req.session.data)&&(req.session.data.loginStatus)) {
        res.redirect('/user/profile');
    } else {
        next();
    }
}

module.exports = sessionGuestMD