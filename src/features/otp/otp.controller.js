import {otpRepository} from "./otp.repository.js"
import {userRepository}from "../users/users.repository.js"
import bcrupt from "bcrypt";
const userRep=new userRepository();

export class otpController{
    constructor(){
        this.otpRepository=new otpRepository();
    }
    create=async (req,res,next)=>{
        try {
            const {email,otp}=req.body;
            const otpData=await this.otpRepository.create(otp,email);
            
            res.status(200).json({message:"otp generated successfully, it will expire by 120 seconds"});
        } catch (error) {
            next(error);
        }
    }
    verify=async (req,res,next)=>{
        try {
            const {email,otp}=req.body;
            const otpData=await this.otpRepository.verify(email,otp);
            if(otpData){await userRep.ToogleEmail(email,true);res.status(200).json({message:"otp verified successfully"});}
            else{res.status(200).json({message:"otp verification failed"});}
        } catch (error) {
            next(error);
        }
    }
    resetpassword=async (req,res,next)=>{
        try {
            let {email,otp,password}=req.body;
            const otpData=await this.otpRepository.verify(email,otp);
            if(otpData){
                let ConnectionId= Math.floor(Math.random() * 10000);
                password=await bcrupt.hash(password,10);
                await userRep.resetPassword(email,password,ConnectionId);
                res.status(200).json({message:"password reset successfully"});}
            else{res.status(200).json({message:"password reset failed"});}
        } catch (error) {
            next(error);
        }
    }
}