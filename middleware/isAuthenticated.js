const isAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("User authenciated",req.user);
        
        return next();
    }else{
        console.log("User is nt Authenticated");
        
        res.redirect('/login');

    }

}

module.exports = isAuth;