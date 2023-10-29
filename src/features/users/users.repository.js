import mongoose from "mongoose";
import { userSehema } from "./users.schema.js";
import {customError} from "../../middleware/error.middleware.js"

const User = mongoose.model("users", userSehema);

export class userRepository{
    signup=async (name,email,password,userprofile,ConnectionId)=>{
        try {
            const user=await User.create({name,email,password,userprofile,ConnectionId});
            return user;
        } catch (error) {
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400,error.message);
            }
            throw new customError(400,"user already exist");
        }
    }
    fndByemail=async(email)=>{
        try {
            const user=await User.findOne({email});
            return user;
        } catch (error) {
            throw new customError(400,"user not found");
        }
    }
    changeConectionId=async(userID,ConnectionId)=>{
        try{
            const user=await User.findById(userID);
            if(!user){throw new customError(400,"Invalid data")}
            user.ConnectionId=ConnectionId;
            await user.save();
        }
        catch(error){
            throw new customError(400,"user not found");
        }
    }
    getUserDetails=async (userID)=>{
        try{
            const user=await User.findById(userID,{password:0,ConnectionId:0,isVerified:0});
            if(!user){throw new customError(400,"Invalid data")}
            return user;
        }
        catch(error){
            throw new customError(400,"user not found");
        }
    }
    getAllUsersDetails=async ()=>{
        try{
            const users=await User.find({},'-password -ConnectionId -isVerified')
            return users;
        }
        catch(error){
            throw new customError(400,"user not found");
        }
    }
    updateUserDetails=async (userId,name,userprofile)=>{
        try{
        const user=await User.findById(userId);
        if(!user){throw new customError(400,"Invalid data")}
        if(name){user.name=name;}
        if(userprofile){user.userprofile=userprofile;}
        await user.save();
        return user;
        }
        catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400,error.message);
            }
            throw new customError(400,"user not found");
        }
    }
    resetPassword=async (email,password,ConnectionId)=>{
        try{
            const user=await User.findOne({email});
            if(!user){throw new customError(400,"Invalid data")}
            user.password=password;
            user.isVerified=true;
            user.ConnectionId=ConnectionId;
            await user.save();
            return user;
        }
        catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400,error.message);
            }
            throw new customError(400,"user not found");
        }
    }
    ToogleEmail=async (email,status)=>{
        try{
            const user=await User.findOne({email});
            if(!user){throw new customError(400,"Invalid data")}
            user.isVerified=status;
            await user.save();
            return user;
        }
        catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400,error.message);
            }
            throw new customError(400,"user not found");
        }
    }
}




export const checkConnectionId=async(ConnectionId,userID)=>{
    try {
        const user=await User.findById(userID);
        if(!user){throw new customError(400,"Invalid data")}
        if(user.ConnectionId==ConnectionId){
            return true;
        }
        return false;
    } catch (error) {
        throw new customError(400,"user not found");
    }
}