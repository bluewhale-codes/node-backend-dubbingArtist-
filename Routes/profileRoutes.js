const express = require("express");
const upload = require("../middleware/multer");
const {registerAudio,createPortfolioWork,createUserProfile} = require("../Controller/profileController")
const normalizeFormData = require("../middleware/normalizeFormData")
const {handleValidation} = require("../middleware/validator/handleValidation");
const {validatePortfolioWork} = require("../middleware/validator/validatePortfolioWork");
const {validateFiles} = require("../middleware/validator/validateFiles");
const router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");


router.post("/upload-video",isAuthenticatedUser,upload.single("video"),registerAudio);
router.post("/uploadPortfolio-work",isAuthenticatedUser,upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
]),normalizeFormData,validatePortfolioWork,validateFiles,handleValidation,createPortfolioWork);
router.post("/createUserProfile",isAuthenticatedUser,upload.single("profileImage"),normalizeFormData,createUserProfile);

module.exports = router;