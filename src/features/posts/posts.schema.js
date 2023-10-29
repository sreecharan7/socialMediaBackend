import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    caption:{type:String, required:true},
    imageUrl:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
});