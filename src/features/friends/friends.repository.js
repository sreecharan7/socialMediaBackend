import mongoose from "mongoose";
import { friendsSchema } from "./friends.schema.js";
import { customError } from "../../middleware/error.middleware.js";
import { userSehema } from "../users/users.schema.js";
const FriendsModel = mongoose.model("friends", friendsSchema);
const UserModel = mongoose.model("users", userSehema);
export class FriendsRepository {
    toogleFriendRequest = async (userId, friendId) => {
        try {
            if(userId===friendId){throw new customError(400,"you can't send friend request to yourself")}
            const userExist=await UserModel.findById(userId);
            const friendExist=await UserModel.findById(friendId);
            if(!friendExist){ throw new customError(400,"the friend is not found");}
            if(!userExist){ throw new customError(400,"the user is not found");}

            let user = await FriendsModel.findOne({ userId: userId });
            let friend = await FriendsModel.findOne({ userId: friendId });
            if(!user){
                const newUser = await FriendsModel.create({ userId: userId });
                if(!friend){
                    const newFriend = await FriendsModel.create({ userId: friendId });
                    newFriend.pendingRequests.push(userId);
                    friend=await newFriend.save();
                    newUser.sentRequests.push(friendId);
                    await newUser.save();
                    return;
                }
                user=await newUser.save();
            }
            if(!friend){
                const newFriend = await FriendsModel.create({ userId: friendId });
                newFriend.pendingRequests.push(userId);
                friend=await newFriend.save();
                user.sentRequests.push(friendId);
                await user.save();
                return;
            }
            const friendIndex = user.friends.findIndex((friend) => friend.toString() === friendId.toString());
            const friendIndexPendingRequest= user.pendingRequests.findIndex((friend) => friend.toString() === friendId.toString());
            if (friendIndex !== -1) {
                user.friends.splice(friendIndex, 1);
                await user.save();
                const userIndex = friend.friends.findIndex((friend) => friend.toString() === userId.toString());
                if (userIndex === -1) {return; }
                friend.friends.splice(userIndex, 1);
                await friend.save();
                return;
            }
            else if(friendIndexPendingRequest !== -1){
                // user.pendingRequests.splice(friendIndexPendingRequest, 1);
                // const userIndex = friend.sentRequests.findIndex((friend) => friend.toString() === userId.toString());
                // if (userIndex === -1) {return; }
                // friend.sentRequests.splice(userIndex, 1);
                // friend.friends.push(userId);
                // user.friends.push(friendId);
                // await friend.save();
                // await user.save();
                return;
            }
            else{
                const userIndex = friend.pendingRequests.findIndex((friend) => friend.toString() === userId.toString());
                if (userIndex === -1) {
                    friend.pendingRequests.push(userId);
                    await friend.save();
                    user.sentRequests.push(friendId);
                    await user.save();
                }
            }
            return ;
        }
        catch (error) {
            if(error instanceof customError){
                throw new customError(error.statusCode,error.message);
            }
            throw new Error(error);
        }
    }
    approveOrRejectFriendRequest = async (userId, friendId, isApproved) => {
        try {
            const user = await FriendsModel.findOne({ userId: userId });
            const friend = await FriendsModel.findOne({ userId: friendId });
            if (!user) { throw new customError(400, "the user is not found"); }
            if (!friend) { throw new customError(400, "the friend is not found"); }
            const friendIndex = user.pendingRequests.findIndex((friend) => friend.toString() === friendId.toString());
            if (friendIndex === -1) { throw new customError(400, "the friend request is not found"); }
            user.pendingRequests.splice(friendIndex, 1);
            const userIndex = friend.sentRequests.findIndex((friend) => friend.toString() === userId.toString());
            if (userIndex !== -1) { friend.sentRequests.splice(userIndex, 1);}
            if (isApproved) {
                user.friends.push(friendId);
                friend.friends.push(userId);
            }
            await user.save();
            await friend.save();
            return;
        }
        catch (error) {
            if(error instanceof customError){
                throw new customError(error.statusCode,error.message);
            }
            throw new Error(error);
        }
    }
    getPendingRequests = async (userId) => {
        try {
            const user = await FriendsModel.findOne({ userId: userId });
            if (!user) { throw new customError(400, "the user is not found"); }
            return user.pendingRequests;
        }
        catch (error) {
            if(error instanceof customError){
                throw new customError(error.statusCode,error.message);
            }
            throw new Error(error);
        }
    }
    getFriends = async (userId) => {
        try {
            const user = await FriendsModel.findOne({ userId: userId });
            if (!user) { throw new customError(400, "the user is not found"); }
            return user.friends;
        }
        catch (error) {
            if(error instanceof customError){
                throw new customError(error.statusCode,error.message);
            }
            throw new Error(error);
        }
    }
}