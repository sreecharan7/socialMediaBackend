import mongoose from "mongoose";

export const friendsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true,
        unique: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }],
    pendingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }],
    sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }]
}, {
    timestamps: true,
});