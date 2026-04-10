const catchAsyncError = require("../middleware/catchAsyncError");
const uploadToCloudinary = require("../middleware/uploadToCloudinary");
const Proposal = require("../model/Project/proposalModel");

exports.createProposal = catchAsyncError(async(req,res,next)=>{

    const result = await uploadToCloudinary(req.file.buffer);

    const proposal = await Proposal.create({
      sender:req.user._id,
      receiver:req.body.receiver,
      project:req.body.project,
      customPrice:req.body.customPrice,
      deliveryDays:req.body.deliveryDays,
      message:req.body.message,
      demoFile:{
        public_Id:result.public_id,
        url:result.secure_url
      }

    })

    res.status(200).json({
        message:"success",
        proposal:proposal
    })
})