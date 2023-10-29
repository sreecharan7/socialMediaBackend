import {PostsRepository} from "./posts.repository.js"
import {customError} from"../../middleware/error.middleware.js"

export class PostsController {
    constructor(){
        this.repository=new PostsRepository();
    }
    createPost=async (req,res,next)=>{
        try{
            const {caption}=req.body;
            const userId=req.userIdAuth.userID;
            if(!req.file){throw new customError(400,"please upload image")}
            let imageUrl="public/files/posts/"+req.file["filename"];
            await this.repository.createPost(caption,imageUrl,userId);
            res.status(200).send({message:"post created successfully"});
        }
        catch(error){
            next(error);
        }
    }
    getPostById=async (req,res,next)=>{
        try{
            const {postId}=req.params;
            const post=await this.repository.getPostById(postId);
            res.status(200).send({post});
        }
        catch(error){
            next(error);
        }
    }
    getAllposts=async (req,res,next)=>{
        try{
            const posts=await this.repository.getAllPosts();
            res.status(200).send({posts});
        }
        catch(error){
            next(error);
        }
    }
    getPostsByUserId=async (req,res,next)=>{
        try{
            const userId=req.userIdAuth.userID;
            const posts=await this.repository.getPostsByUserId(userId);
            res.status(200).send({posts});
        }
        catch(error){
            next(error);
        }
    }
    deletePostById=async (req,res,next)=>{
        try{
            const {postId}=req.params;
            const userId=req.userIdAuth.userID;
            const deleteStatus=await this.repository.deletePostById(postId,userId);
            if(!deleteStatus){throw new customError(400,"There is no post with this id")}
            res.status(200).send({message:"post deleted successfully"});
        }
        catch(error){
            next(error);
        }
    }
    updatePost=async (req,res,next)=>{
        try{
            const {postId}=req.params;
            const userId=req.userIdAuth.userID;
            const {caption}=req.body;
            let imageUrl;
            if(!req.file){imageUrl=null;}
            else{imageUrl="public/files/posts/"+req.file["filename"];}
            if(!caption && !imageUrl){throw new customError(400,"please enter caption or upload image,There is nothing to update")}
            const post=await this.repository.updatePost(postId,userId,caption,imageUrl);
            res.status(200).send({message:"post updated successfully"});
        }
        catch(error){
            next(error);
        }
    }

}