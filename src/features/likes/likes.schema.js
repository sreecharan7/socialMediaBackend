import mongoose from "mongoose";

export const likesSchema = new mongoose.Schema({
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true
        }
    ,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true,
        index: true
    }
})