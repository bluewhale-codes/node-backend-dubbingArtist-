const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema(
  {

    sender:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true
    },
    sender_avatar:{
          public_Id:{
                type:String,
                default:""
        },
        url:{
                type:String,
                default:""
        }
    },
    title:{
       type:String,
       default:""
    },
    category:{
        type:String,
        default:""
    },
    sender_name:{
        type:String,
        default:""
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
    status:{
      type:String,
      default:"PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", offerSchema);