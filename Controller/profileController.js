const Audio = require("../model/Profile/videoDemoModel");
const VoicePortfolio = require("../model/Profile/portfolioWorkModel");
const userProfile = require("../model/Profile/userProfileModel")
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const uploadImage = require("../middleware/uploadImage");
const cloudinary = require("../middleware/cloudinary")

exports.registerAudio = catchAsyncError(async(req,res,next)=>{
      console.log("hello start here")
      console.log(req.body);

      console.log(req.file);
      
       if(!req.file){
         return next(new ErrorHander("No file uploaded",400));s
       }

       const result = await uploadToCloudinary(req.file.buffer);

       const audio = await Audio.create({
        projectTitle:req.body.title,
        typeOfAudio:req.body.audioType,
        audioFileUrl:result.secure_url
       })

       res.status(200).json({
          message:"Upload Successfully",
          data:audio
     })
})

// exports.createPortfolioWork = catchAsyncError(async(req,res,next)=>{
     
      
       
      // if(!req.files.video[0]){
      //   return next(new ErrorHander("No file uploaded",400));
      // }

      //const result = await uploadToCloudinary(req.files.video[0].buffer);
      // const image = await  uploadImage(req.files.thumbnail[0].buffer);
      // res.status(200).json({
      
      //   image:image.secure_url
      // })

      // const portfolio = await VoicePortfolio.create({
      //       title : req.body.title,
      //       description : req.body.description,
      //       audioFile :result.secure_url,
      //       duration : req.body.duration,
      //       voiceCategory : req.body.voiceCategory,
      //       languages : req.body.languages,
      //       voiceStyles : req.body.voiceStyles,
      //       clientName : req.body.clientName,
           
      //       rating : req.body.rating,
      //       clientFeedback : req.body.clientFeedback,
      //       completionDate : req.body.completionDate,
      //       thumbnail : req.body.thumbnail
      // })

      // res.status(200).json({
      //     message:'success',
      //     data:portfolio
      // })
    
//})


exports.createPortfolioWork = catchAsyncError(async(req,res,next)=>{
  
     console.log(req.body);
    
      const result = await uploadToCloudinary(req.files.video[0].buffer);
      const image = await  uploadImage(req.files.thumbnail[0].buffer);
      

      const work = await VoicePortfolio.create({
         user:req.user._id,
         title:req.body.title,
         description:req.body.description,
         voiceCategory:req.body.voiceCategory,
         clientName:req.body.clientName,
         clientFeedback:req.body.clientFeedback,
         completionDate:req.body.completionDate,
         rating:req.body.rating,
         languages:req.body.languages,
         voiceStyles:req.body.voiceStyles,
         audioFile:{
            public_Id:result.public_id,
            url:result.secure_url
         },
         thumbnail:{
            public_Id:image.public_id,
            url:image.secure_url
         }
      })

      res.status(200).json({
          success:true,
          message:"Successfully register Your Porfolio work"
        // result:result.secure_url,
        // result_id:result.public_id,
        // image:image.secure_url,
        // image_id:image.public_id,
      })
      
    })

exports.createUserProfile = catchAsyncError(async(req,res,next)=>{
     const image = await  uploadImage(req.file.buffer);


     const userDetail = await userProfile.create({
            user:req.user._id,
            avatar:{
               public_Id:image.public_id,
               url:image.secure_url
            },
            dubbingLanguages:req.body.dubbingLanguages,
            expertise:req.body.expertise,
            location:req.body.location,
            experience:req.body.experience,
            about:req.body.artistName
     })

   res.status(200).json({
       success:true,
       message:"User detail successfully updated",
       userDetail:userDetail
   })
})

