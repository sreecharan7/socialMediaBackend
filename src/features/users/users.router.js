import {userController} from "./users.controller.js"
import express from "express";
import auth from "../../middleware/jwt.middleware.js"
import { uploadFile } from "../../middleware/fileUpload.middleware.js";

const app=express.Router();
const userControllerClass=new userController();

app.post("/signup",uploadFile.single("profileImage"),(req,res,next)=>{
    userControllerClass.signup(req,res,next);
});

app.post("/signin",(req,res,next)=>{
    userControllerClass.sigin(req,res,next);
});
app.get("/logout",auth,(req,res,next)=>{
    userControllerClass.logout(req,res,next);
});
app.get("/logout-all-devices",auth,(req,res,next)=>{
    userControllerClass.logoutAllDevices(req,res,next);
});
app.get("/get-details/:userId",(req,res,next)=>{
    userControllerClass.getUserDetails(req,res,next);
});
app.get("/get-all-details",(req,res,next)=>{
    userControllerClass.getAllUsersDetails(req,res,next);
});
app.put("/update-details",auth,uploadFile.single("profileImage"),(req,res,next)=>{
    userControllerClass.updateUserDetails(req,res,next);
});
export default app;