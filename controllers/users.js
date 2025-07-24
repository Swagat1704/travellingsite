const User = require("../models/user.js")

module.exports.signUp=(req,res)=>{
    res.render("users/signup")
}
module.exports.renderSignupForm=async(req,res)=>{
    try{
        let{username ,email,password } = req.body;
   const newUser= new User ({email,username})
    const registeredUser= await User.register(newUser,password)
    console.log(registeredUser)
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);

        }
        req.flash("success","Welcome to Wanderlust")
    res.redirect("/listings")
        
    })
    
    }
    catch(e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}
module.exports.renderLogInForm=(req,res) =>{
    res.render("users/login")
}
module.exports.logIn=async(req,res)=> {
    req.flash("success","Welcome back to Wanderlust")
    let redirectUrl = res.locals.saveRedirectUrl || "/listings"
    res.redirect(redirectUrl)
}
module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err) {
            next(err)
        }
        req.flash("success","You are logged out now")
        res.redirect("/listings")
    })
}