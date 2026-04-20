const mongoose = require("mongoose")

const contractSchema = new mongoose.Schema(
    {
    project:{
            projectId: { 
                type: mongoose.Schema.ObjectId,
                ref: "Project", 
                required: true 
            },
            project_title:{
                type:String,
                required:true
            },
    },
    client: { 
        clientID: {
           type: mongoose.Schema.ObjectId, ref: "User", required: true
        },
        clientAvatar:{
            type:String,
           
            default:"image"
        },
        name:{
            type:String,
            required:true,
        },
        email:{
             type:String,
             required:true
        }
     },
    
    artist:{
        artistId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        artistAvatar:{
            type:String,
            
            default:"image"
        },
        name:{
            type:String,
            required:true,
        },
        email:{
             type:String,
             required:true
        }
    },
    proposal:{
        proposalId: { type: mongoose.Schema.ObjectId, ref: "Proposal" },
        agreedPrice: { type: Number, required: true },
        deliveryDays: Number,
       // deadline: Date,
    },

    scopeOfWork: {
        type: String,
        default:"NO DESCRIPTION"
    },
    requirements:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "SUBMITTED", "REVISION", "COMPLETED", "CANCELLED"],
        default: "ACTIVE"
    },

    paymentStatus: {
        type: String,
        enum: ["PENDING", "ESCROW", "RELEASED"],
        default: "PENDING"
    },

    submissionUrl: String,

    revisionCount: { type: Number, default: 0 },
    maxRevisions: { type: Number, default: 2 }

},
 { timestamps: true }
)


module.exports = mongoose.model("Contract",contractSchema)