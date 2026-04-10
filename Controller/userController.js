const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const sendToken = require("../utils/jwt");
const JWT_SECRET = process.env.JWT_SECRET;
const passport = require("passport");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require('../middleware/catchAsyncError');

// User registration
exports.registerUser =  catchAsyncError(async(req,res,next)=>{
    
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      
    const {name,email,password,role} = req.body;
    // Validate user Data
    




    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHander("User already Exists with this Email",400))
    }

    // create user
    const user = await User.create({
      name,
      email,
      password:secPass,
      role
    });

    const data = {
       userInfo:user
    }

    sendToken(data,JWT_SECRET,200,res);

})


exports.testApi = catchAsyncError(async(req,res,next)=>{
      
    
          if(2!=9){
             throw new ErrorHander("Intefsdafasdfasdrnal error",200)
          }
  
})


exports.loginUser = catchAsyncError(async(req,res,next)=>{
    
          const {email,password} = req.body;

          // check user given password and email both
          if(!email || !password){
               return next(new ErrorHander("Please Enter email or password",400))
          }
          const user = await User.findOne({email}).select("+password");

          if(!user){
           return next(new ErrorHander("Incorrect username or password",400));
          }
         
          const ispasswordMatch = await user.camparePassword(password);
          if(!ispasswordMatch){
            return next(new ErrorHander("Incorrect password or username",400));
          }
          const data = {
            userInfo:user
          }

          sendToken(data,JWT_SECRET,200,res);
        
            
     
})

exports.googleRegister = async (req,res,next)=>{
    return  passport.authenticate("google",{
      scope: ['profile', 'email'],
      prompt: 'select_account', // <== Forces account selection
    })(req,res,next);
}

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login'); // or send error
    }

    // attach user manually
    req.user = user;

    const authtoken = user.token;

    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("Token", authtoken, options);
    res.redirect("http://localhost:5173");

  })(req, res, next);
};

exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);

    if(!user){
       return next(new ErrorHander("User not found with this ID",400));
    }

    res.status(200).json({
        user:user
    })
})
