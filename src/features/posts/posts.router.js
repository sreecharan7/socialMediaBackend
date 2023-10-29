import express from "express";  
import {PostsController} from "./posts.controller.js";
import { uploadFile } from "../../middleware/fileUpload.middleware.js";

const router=express.Router();
const postcontroller=new PostsController();



router.post("/",(req,res,next)=>{
    req.storageFolder="public/files/posts/";
    next();
},uploadFile.single("postImage"),postcontroller.createPost);

router.get("/all",postcontroller.getAllposts);
router.get("/:postId",postcontroller.getPostById);
router.get("/",postcontroller.getPostsByUserId);
router.delete("/:postId",postcontroller.deletePostById);
router.put("/:postId",(req,res,next)=>{
    req.storageFolder="public/files/posts/";
    next();
},uploadFile.single("postImage"),postcontroller.updatePost);

export default router;