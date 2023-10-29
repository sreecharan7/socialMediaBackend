import mongoose from "mongoose";

export const userSehema=new mongoose.Schema({
    name:{type:String,required:true,minLength:3,maxLength:20},
    email:{type:String,required:true,unique:true,match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please enter a valid email']},
    password:{type:String,required:true},
    userprofile:{type:String,required:true},
    ConnectionId:{type:Number,required:true},
    isVerified:{type:Boolean,default:false,enum:[true,false]}
})