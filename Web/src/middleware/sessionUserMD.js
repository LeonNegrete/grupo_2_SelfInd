const sessionUserMD = (req,res,next) => {
    
    if (typeof(req.session.username) !== 'undefined') {
        //console.log("Entra un user con sesion");
        next();
        
    } else {
        res.redirect('/user/login');
    }
}

module.exports = sessionUserMD