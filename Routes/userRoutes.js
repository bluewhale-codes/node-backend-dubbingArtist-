const express = require("express");
const {isAuthenticatedUser} = require("../middleware/auth")
const {registerUser,loginUser,googleRegister,googleCallback,testApi, getUser} = require("../Controller/userController");
const router = express.Router();


router.post("/createUser",registerUser);
router.post("/login",loginUser);
router.get("/googleAuth",googleRegister);
router.get("/googleauthCallback",googleCallback);
router.get("/me",isAuthenticatedUser,getUser)
router.get("/test",testApi);

module.exports = router;