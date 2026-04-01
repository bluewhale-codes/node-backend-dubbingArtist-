const mongoose = require("mongoose");

const voiceProjectSchema = new mongoose.Schema(
  {
      user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true
   },


    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    audioFile: {
        public_Id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },

    voiceCategory: {
      type: String,
      required: true,
      //enum: ["male", "female", "child", "robotic"], 
    },

    languages: {
      type: [String],
      required: true,
     // enum: ["english", "hindi", "punjabi", "other"], // extend if needed
    },

    voiceStyles: {
      type: [String],
      required: true,
      //enum: ["formal", "casual", "energetic", "narrative"],
    },

    clientName: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    completionDate: {
      type: Date,
      required: true,
    },

    clientFeedback: {
      type: String,
      trim: true,
      default:''
    },
    thumbnail:{
            public_Id:{
                type:String,
                required:false
            },
            url:{
                type:String,
                required:false
            }
    }
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("VoicePortfolio", voiceProjectSchema);