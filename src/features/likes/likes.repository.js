import mongoose from "mongoose";
import {likesSchema} from "./likes.schema.js"
import {customError} from "../../middleware/error.middleware.js"
const Likesmodel = mongoose.model("likes", likesSchema);

export class likesRepository {
    toogleLike=async (postId,userId)=>{
        try{
        const likef=await Likesmodel.findOneAndDelete({postId,userId});
        if(!likef){
        const like = new Likesmodel({
            userId,
            postId
        })
        return await like.save();
         } 
        }
        catch(error){
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400, error.message);
            }
            throw new customError(400, "something went wrong while getting likes");
        }

    }
    getLikesByPostId=async (postId)=> {
        try{
         const likes=await Likesmodel.find({postId:postId});
         return likes;
        }
        catch(error){
            throw new customError(400, "something went wrong while getting likes");
        }
    }

}