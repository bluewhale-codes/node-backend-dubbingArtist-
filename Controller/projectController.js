const catchAsyncError = require("../middleware/catchAsyncError");
const uploadToCloudinary = require("../middleware/uploadToCloudinary");
const Project = require("../model/Profile/projectModel");
const UserProfile = require("../model/Profile/userProfileModel");
const Proposal = require("../model/Project/proposalModel");
const User = require("../model/userModel");
const Contract = require("../model/Project/contractModel")
const ErrorHander = require("../utils/errorhandler");

exports.createProposal = catchAsyncError(async(req,res,next)=>{
    const user_id = req.user._id

    //const result = await uploadToCloudinary(req.file.buffer);
    

    const sender = await UserProfile.findOne({user:user_id});
    const user  = await User.findById(user_id);
    const project = await Project.findById(req.body.project);
    


    const proposal = await Proposal.create({
      sender:req.user._id,
      sender_avatar:{
        public_Id:sender.avatar.public_Id,
        url:sender.avatar.url
      },
      title:project.title,
      category:project.category,
      sender_name:user.name,
      receiver:req.body.receiver,
      project:req.body.project,
      customPrice:req.body.customPrice,
      deliveryDays:req.body.deliveryDays,
      message:req.body.message,
      demoFile:{
        public_Id:"fasdfa",
        url:"fasdfsda"
      }

    })

    res.status(200).json({
        message:"success",
        proposal:proposal
    })
})

exports.getProposals = catchAsyncError(async(req,res,next)=>{
    

    const proposals = await Proposal.find({receiver:req.user._id})



    res.status(200).json({
      message:"success",
      proposals:proposals
    })

})

exports.acceptProposal = catchAsyncError(async(req,res,next)=>{
     

    const user = await User.findById(req.user._id);
    const proposal = await Proposal.findById(req.body.proposal_id);

    if(user.role != "client"){
       return next(new ErrorHander("You are not Allowed to do this action", 400))
    }
    if(proposal.status == "ACCEPTED"){
       return next(new ErrorHander("Proposal already accepted please refresh the pages to see changes",400));
    }else{
      proposal.status =  "ACCEPTED";


      // Reject All other Proposal
      await Proposal.updateMany(
      { project: proposal.project, _id: { $ne: proposal._id } },
      { status: "REJECTED" }
    );

    }
    

     await proposal.save();

      
     res.status(200).json({
       message:"success",
       proposal:proposal
       
     })
})
exports.createProposal = catchAsyncError(async(req,res,next)=>{
     
   const proposal = await Proposal.findById(req.body.proposal_id);
   
   const client = await User.findById(req.user._id);
   const artist = await User.findById(proposal.sender);
   

    

    const contract = await Contract.create({
          project:{
                  projectId:proposal.project,
                  project_title:proposal.title
          },
          client: { 
              clientID:client._id,
              
              name:client.name,
              email:client.email
           },
          
          artist:{
              artistId:artist._id,
          
              name:artist.name,
              email:artist.email
          },
          proposal:{
              proposalId:proposal._id,
              agreedPrice:proposal.customPrice,
              deliveryDays:proposal.deliveryDays,
          },
      
          scopeOfWork:req.body.scodeOfWork,
          requirements:req.boyd.requirements,
      
      
          submissionUrl:req.body.subb_url,
      
         
          maxRevisions:req.body.maxRevisions
    })
    

     
      
     res.status(200).json({
       message:"success",
       contract:contract
       
     })
})

