import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
         required : true
    },

})

const User = new mongoose.model("users", userSchema)

export default User