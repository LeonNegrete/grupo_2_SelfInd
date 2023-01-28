const sessionUserMD = (req,res,next) => {
    
    if (typeof(req.session.username) !== 'undefined') {
        next();
    } else {
        res.redirect('/user/login');
    }
}
module.exports = sessionUserMD