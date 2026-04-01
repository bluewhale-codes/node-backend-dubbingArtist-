const express = require("express");
const passport = require("passport");
const cors = require('cors');
const errorMiddleware = require("./middleware/errors")
const upload = require("./middleware/multer");
const uploadToCloudinary = require("./middleware/uploadToCloudinary");
const cookieParser = require("cookie-parser")
const dontenv = require("dotenv");


dontenv.config();


require('./config/passport')


const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(passport.initialize());

//user Routes
const userRoute = require("./Routes/userRoutes");
const profileRoute = require("./Routes/profileRoutes");

// Start Google login
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // <== Forces account selection
  })
);


app.get('/auth/google/callback',
  passport.authenticate('google', {
    session:false,
  }),(req, res) => {
     const authtoken = req.user.token;
     const options = {
        expires: new Date(
              Date.now() + 2*24*60*60*1000
        ),
        httpOnly:true
     }
     res.cookie("Token",authtoken,options);
     res.redirect('/success');
  }
);



app.use("/api",userRoute);
app.use("/profile",profileRoute)
app.get("/",(req,res)=>{
    res.send(
        "Hello world"
    );
})
app.get("/success",(req,res)=>{
    res.send(
       "Successfully login"
    );
})


// Upload to cloudinary

app.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      message: "Video uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});


app.use(errorMiddleware);
module.exports = app;