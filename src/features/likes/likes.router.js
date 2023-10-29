import {likesControler} from "./likes.controller.js"
import express from "express";

const app=express.Router();
const likesCont=new likesControler();

app.get("/toggle/:postId",(req,res,next)=>{
    likesCont.toogleLike(req,res,next);
})
app.get("/:postId",(req,res,next)=>{
    likesCont.getLikesByPostId(req,res,next)
})


export default app;