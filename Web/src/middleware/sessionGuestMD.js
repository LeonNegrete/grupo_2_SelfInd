const sessionGuestMD = (req,res,next) => {
    
    if (typeof(req.session.username) !== 'undefined') {
        res.redirect('/user/profile');
    } else {
        //console.log("Entra un guest");
        next();
    }
}

module.exports = sessionGuestMD