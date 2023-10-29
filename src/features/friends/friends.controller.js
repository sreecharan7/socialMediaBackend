import { FriendsRepository } from "./friends.repository.js";
import { customError } from "../../middleware/error.middleware.js";

export class FriendsController {
    constructor() {
        this.friendsRepository = new FriendsRepository();
    }
    toogleFriendRequest = async (req, res, next) => {
        try {
            const { friendId } = req.params;
            const userId = req.userIdAuth.userID;
            await this.friendsRepository.toogleFriendRequest(userId, friendId);
            res.status(200).json({ message: "the friend  is sucessfully toggled" });
        }
        catch (error) {
            next(error);
        }
    }
    approveOrRejectFriendRequest = async (req, res, next) => {
        try {
            const { friendId } = req.params;
            const userId = req.userIdAuth.userID;
            const { isApproved } = req.body;
            if(isApproved!=true){
                isApproved=false;
            }
            await this.friendsRepository.approveOrRejectFriendRequest(userId, friendId, isApproved);
            res.status(200).json({ message: "the friend request is sucessfully toggled" });
        }
        catch (error) {
            next(error);
        }
    }
    getFriends = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const friends = await this.friendsRepository.getFriends(userId);
            res.status(200).json({ friends: friends });
        }
        catch (error) {
            next(error);
        }
    }
    getPendingRequests = async (req, res, next) => {
        try {
            const userId = req.userIdAuth.userID; 
            const pendingRequests = await this.friendsRepository.getPendingRequests(userId);
            res.status(200).json({ pendingRequests: pendingRequests });
        }
        catch (error) {
            next(error);
        }
    }
}