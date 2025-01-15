import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max:20,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min:5,
    },
    isAvatarImageSet : {
        type: Boolean,
        default: false
    },
    avatarImage:{
        type: String,
        default:"",
    }
})

const userModel = mongoose.model("users", userSchema);

export default userModel;