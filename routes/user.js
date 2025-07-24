const express = require("express")
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const { Passport } = require("passport");
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js")
const passport = require("passport");


router.route("/signup")
.get(userController.signUp)
.post(wrapAsync(userController.renderSignupForm))


router.route("/login")
.get(userController.renderLogInForm)
.post(saveRedirectUrl,passport.authenticate("local" , {failureRedirect: '/login',failureFlash:true}),userController.logIn)




router.get("/logout",userController.logOut)
module.exports = router;