import {likesRepository} from "./likes.repository.js"
import { PostsRepository } from "../posts/posts.repository.js";
import { customError } from "../../middleware/error.middleware.js";
const postsRepository=new PostsRepository();
export class likesControler {
    constructor() {
        this.likesRepository = new likesRepository();
    }
    toogleLike=async (req,res,next)=>{
        try{
            const {postId}=req.params;
            const userId=req.userIdAuth.userID;
            const post=await postsRepository.getPostById(postId);
            if(!post){
                throw new customError(400,"the post is not found");
            }
            const like=await this.likesRepository.toogleLike(postId,userId);
            res.status(200).json({message:"the like is sucessfully toggled for the post"});
        }
        catch(error){
            next(error);
        }
    }
    getLikesByPostId=async (req,res,next)=>{
        try{
            const {postId}=req.params;
            const post=await postsRepository.getPostById(postId);
            if(!post){
                throw new customError(400,"the post is not found");
            }
            const likes=await this.likesRepository.getLikesByPostId(postId);
            res.status(200).json({postId:postId,likes:likes});
        }
        catch(error){
            next(error);
        }
    }
}
