import mongoose, { models } from "mongoose";


const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true, "Username is required"],
        unique : true,
    },
    email :{
        type : String,
        required : [true, "Email is required"],
        unique : true,
    },
    password :{
        type : String,
        required : [true, "Password is required"],
    },
    isAdmin :{
        type : Boolean,
        default : false,
    },
    isVerified :{
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
})

const User = models.users ||  mongoose.model("users", userSchema);

export default User







