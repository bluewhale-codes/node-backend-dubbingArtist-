const express = require("express");

const {registerUser,loginUser,googleRegister,googleCallback,testApi} = require("../Controller/userController");
const router = express.Router();


router.post("/createUser",registerUser);
router.post("/login",loginUser);
router.get("/googleAuth",googleRegister);
router.get("/googleauthCallback",googleCallback);
router.get("/test",testApi);

module.exports = router;