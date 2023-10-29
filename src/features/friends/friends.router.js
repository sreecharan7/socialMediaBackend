import { FriendsController } from "./friends.controller.js";
import express from "express";

const app = express.Router();
const friendsController = new FriendsController();



app.get("/toggle-friendship/:friendId", (req,res,next)=>{
    friendsController.toogleFriendRequest(req,res,next);
});

app.post("/response-to-request/:friendId", (req,res,next)=>{
    friendsController.approveOrRejectFriendRequest(req,res,next);
});

app.get("/get-pending-requests", (req,res,next)=>{
    friendsController.getPendingRequests(req,res,next);
});
app.get("/get-friends/:userId", (req,res,next)=>{
    friendsController.getFriends(req,res,next);
});

export default app;