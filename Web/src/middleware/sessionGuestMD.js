const sessionGuestMD = (req,res,next) => {
    
    if (typeof(req.session.username) !== 'undefined') {
        res.redirect('/user/profile');
    } else {
        next();
    }
}

module.exports = sessionGuestMD