const mongoose = require("mongoose");

const dbURL = "mongodb://0.0.0.0:27017/DubbingArtist";

const connectToDB = () =>{
     mongoose.connect(dbURL)
     .then(()=>{
        console.log("Connection to Database Successfully");
     })
     .catch((err)=>{
        console.error("Connection fails"+err);
     })
}

module.exports = connectToDB;