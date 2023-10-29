import {userRepository} from "./users.repository.js"
import bcrupt from "bcrypt";
import jwt from "jsonwebtoken";
import {customError} from "../../middleware/error.middleware.js"
export class userController{
    constructor(){
        this.userRepository=new userRepository();
    }
     signup=async(req,res,next)=>{
        try {
            let {name,email,password}=req.body;
            let ConnectionId= Math.floor(Math.random() * 10000);
            password=await bcrupt.hash(password,10);
            const imageUrl="public/files/"+req.file.filename;
            const user=await this.userRepository.signup(name,email,password,imageUrl,ConnectionId);
            res.status(200).send("signined sucessfully");
        } catch (error) {
            next(error);
        }
    }
    sigin=async (req,res,next)=>{
        try {
            const {email,password}=req.body;
            const user=await this.userRepository.fndByemail(email);
            if(!user){
                throw new customError(400,"invalid email");
            }
            const isMatch=await bcrupt.compare(password,user.password);
            if(!isMatch){
                throw new customError(400,"invalid password");
            }
            var token=jwt.sign({user:user._id,ConnectionId:user.ConnectionId}, 'N33x4FdxodO7XKELZMcY10QRCAD9CI2t', { expiresIn: 60 * 60 });
            res.cookie("usercredentails",token,{maxAge:1000*60*60})
            res.status(200).send("sucessfully loggined");
        } catch (error) {
            next(error);
        }
    }
    logout=async(req,res,next)=>{
        try {
            res.clearCookie("usercredentails");
            res.status(200).send("sucessfully logout");
        } catch (error) {
            next(error);
        }
    }
    logoutAllDevices=async(req,res,next)=>{
        try {
            const {userID,ConnectionId}=req.userIdAuth;
            let r=Math.floor(Math.random() * 10000)
            while(r==ConnectionId){
                r=Math.floor(Math.random() * 10000)
            }
            const user=await this.userRepository.changeConectionId(userID,r);
            res.clearCookie("usercredentails");
            res.status(200).send("sucessfully logout");
        } catch (error) {
            next(error);
        }
    }
    getUserDetails=async(req,res,next)=>{
        try {
            const userID=req.params.userId;
            const user=await this.userRepository.getUserDetails(userID);
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }
    getAllUsersDetails=async(req,res,next)=>{
        try {
            const users=await this.userRepository.getAllUsersDetails();
            res.status(200).send(users);
        } catch (error) {
            next(error);
        }
    }
    updateUserDetails=async(req,res,next)=>{
        try {
            const userID=req.userIdAuth.userID;
            const name=req.body["name"];
            let imageUrl=req["file"];
            if(imageUrl){
                imageUrl="public/files/"+imageUrl["filename"];
            }
            if(!name && !imageUrl){
                throw new customError(400,"please provide name or image to update");
            }
            const user=await this.userRepository.updateUserDetails(userID,name,imageUrl);
            res.status(200).send("updated sucessfully");
        } catch (error) {
            next(error);
        }
    }
}