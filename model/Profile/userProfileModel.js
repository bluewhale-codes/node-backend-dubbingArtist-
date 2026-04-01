const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
  },

  avatar: {
    public_Id:{
            type:String,
            default:""
    },
    url:{
            type:String,
            default:""
    }
  },

  dubbingLanguages:{
     type:[String],
     required:true
  },


  expertise:{
    type:[String],
    required:true
  },

  location:{
     type:String,
     required:true
  },

  experience:{
    type:Number,
    required:true
  },
  about: {
    type: String,
    default: ""
  }
  
}, {
  timestamps: true   // automatically adds createdAt & updatedAt
});


module.exports = mongoose.model("UserProfile",userSchema);