const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema(
  {

    sender:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true
    },
    receiver:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true
    },
    project:{
        type:mongoose.Schema.ObjectId,
        ref:"Project",
        required:true
    },
    customPrice: {
      type: Number,
      required: true,
    },
    deliveryDays: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    demoFile: {
        public_Id:{
            type:String,
            default:""
        },
        url:{
            type:String,
            default:""
        }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", offerSchema);