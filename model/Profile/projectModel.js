//import mongoose from "mongoose";
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
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

    category: {
      type: String,
      //enum: ["Commercial", "Narration", "Animation", "Audiobook", "E-learning", "Other"],
      required: true,
    },

    projectDescription: {
      type: String,
      required: true,
    },

    industryType: {
      type: String,
      required:true
    },


    script: {
      public_Id:{
            type:String,
            default:""
      },
      url:{
              type:String,
              default:""
      }
    },

    // wordCount: {
    //   type: Number,
    // },

    // estimatedDuration: {
    //   type: Number, // in seconds or minutes (decide one)
    // },

    language: {
      type: String,
      required: true,
    },

    accent: {
      type: String,
    },

    gender: {
      type: String,
      //enum: ["Male", "Female", "Other"],
    },

    voiceAgeRange: {
      //min: Number,
     // max: Number,
      type:String,
      require:true
    },

    voiceStyleTone: [
      {
        type: String, // e.g. "Warm", "Energetic", "Corporate"
      },
    ],

    referenceAudio: {
      public_Id:{
            type:String,
            default:""
      },
      url:{
              type:String,
              default:""
      }
    },

    usage: [
      {
        type: String,
        //enum: ["TV", "Radio", "Social Media", "YouTube", "Internal", "Other"],
      },
    ],

    region: {
      type: String,
    },

    usageDuration: {
      value: Number,
      unit: {
        type: String,
        enum: ["months", "years"],
      },
    },

    pricingModel: {
      type: String,
      //enum: ["Fixed", "Per Word", "Per Minute"],
    },

    deliverySpeed: {
      type: String, // e.g. "24h", "48h"
    },

    deadlineDate: {
      type: Date,
    },

    revisions: {
      type: Number,
      default: 0,
    },

    fileFormat:{
        type: String,
        enum: ['MP3', 'WAV',"Both"],
        required: true
    },
   

    audioQuality: {
      type: String, // e.g. "Studio", "Home Setup"
    },

    additionalInstructions: {
      type: String,
    },
    budget:{
      min:Number,
      max:Number,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);