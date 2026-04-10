const Audio = require("../model/Profile/videoDemoModel");
const VoicePortfolio = require("../model/Profile/portfolioWorkModel");
const userProfile = require("../model/Profile/userProfileModel")
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const uploadImage = require("../middleware/uploadImage");
const Project = require("../model/Profile/projectModel");
const uploadScript = require("../middleware/uploadScript");

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


exports.uploadScript = catchAsyncError(async(req,res,next)=>{
 
   
   
   const script = await  uploadScript(req.files.script[0].buffer);
   const audio  = await  uploadToCloudinary(req.files.audioFile[0].buffer);


   // Model creation
   const project = await Project.create({
               user:req.user._id,
               title:req.body.projectTitle,
               category:req.body.category,
               projectDescription:req.body.description,
               industryType:req.body.industry,
             
               script:{
                    public_Id:script.public_id,
                    url:script.secure_url
               },
               // wordCount
               // estimatedDuration
               language:req.body.language,
               accent:req.body.accent,
               gender:req.body.gender,
               voiceAgeRange:req.body.ageRange,
               voiceStyleTone:req.body.voiceStyles,
               referenceAudio:{
                   public_Id:audio.public_id,
                    url:audio.secure_url
               },
               usage:req.body.usageTypes,
               region:req.body.region,

               usageDuration:{value:req.body.duration,unit:req.body.monthyear},
               pricingModel:req.body.pricingModel,
               deliverySpeed:req.body.deliverySpeed,
               deadlineDate:req.body.deadline,
               revisions:req.body.revisions,
               fileFormat:req.body.fileFormat,
               audioQuality:req.body.audioQuality,
               additionalInstructions:req.body.additionalInstructions,
               budget:{
                     min:req.body.minBudget,
                     max:req.body.maxBudget
               }

  })
   
   res.status(200).json({
       message:"Project Created successfully",
       project:project
      
   })

})

exports.getAllProjects = catchAsyncError(async(req,res,next)=>{
    
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      count: projects.length,
      projects: projects,
    })


})

exports.getProjectdetails = catchAsyncError(async (req, res,next) => {
  
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorHander("No project Found with this Project",400));
    }

    res.status(200).json({
      success: true,
      details: project,
    });
  } 
)

