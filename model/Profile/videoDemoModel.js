const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    typeOfAudio: {
      type: String,
      required: true,
      //enum: ["music", "podcast", "audiobook", "voiceover"], 
    },

    audioFileUrl: {
      type: String, // store file URL or path
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioSchema);