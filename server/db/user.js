import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    UserId : String,
    UserName : String,
    Password : String,
    Age : Number,
    Email : String,
    Mobile : String
})

const userModel = mongoose.model("users", userSchema);

export default userModel;
