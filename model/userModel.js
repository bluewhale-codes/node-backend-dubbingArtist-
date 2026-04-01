const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
   required: function () {
    return this.provider === 'local'; // ✅ only required for manual signup
    },
  },

  role: {
    type: String,
    enum: ["artist", "client"], // artist or someone who needs artist
    default: "client"
  },


}, {
  timestamps: true   // automatically adds createdAt & updatedAt
});

userSchema.methods.camparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);