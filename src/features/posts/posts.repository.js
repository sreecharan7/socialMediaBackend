import mongoose from "mongoose";
import { PostSchema } from "./posts.schema.js";
import {customError} from "../../middleware/error.middleware.js"
const PostModel = mongoose.model("posts", PostSchema);

export class PostsRepository  {

    createPost=async (caption, imageUrl,userId)=> {
        try{
         const post=await PostModel.create({ caption, imageUrl ,userId});
         return post;
        }
        catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400, error.message);
            }
            throw new customError(400, "something went wrong while creating post");
        }
    }
    getPostById=async (postId)=> {
        try{
         const posts=await PostModel.findById(postId);
         return posts;
        }
        catch(error){
            throw new customError(400, "something went wrong while getting posts");
        }
    }
    getAllPosts=async ()=> {
        try{
         const posts=await PostModel.find();
         return posts;
        }
        catch(error){
            throw new customError(400, "something went wrong while getting posts");
        }
    }
    getPostsByUserId=async (userId)=> {
        try{
         const posts=await PostModel.find({userId:userId});
         return posts;
        }
        catch(error){
            throw new customError(400, "something went wrong while getting posts");
        }
    }
    deletePostById=async (postId,userID)=> {
        try{
         const post=await PostModel.findOneAndDelete({_id:postId,userId:userID});
         return post;
        }
        catch(error){
            console.log(error);
            throw new customError(400, "something went wrong while getting posts");
        }
    }
    updatePost=async (postId,userID,caption,imageUrl)=> {
        const post=await PostModel.findOne({_id:postId,userId:userID});
        if(!post){throw new customError(400,"There is no post with this id")}
        if(caption){post.caption=caption;}
        if(imageUrl){post.imageUrl=imageUrl;}
        await post.save();
        return post;
    }
};
