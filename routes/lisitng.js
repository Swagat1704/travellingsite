const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn} =require("../middleware.js")
const {isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),validateListing ,
    wrapAsync(listingController.createListings));


//New route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,
    upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListings))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));







//edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));




module.exports = router; // Ensure this is here
