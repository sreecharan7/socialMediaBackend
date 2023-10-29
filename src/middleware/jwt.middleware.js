import jwt from "jsonwebtoken"
import {checkConnectionId} from "../features/users/users.repository.js"
export default async function auth(req,res,next){
    var token =req.cookies["usercredentails"];
    if(token){
        var d=jwt.verify(token, 'N33x4FdxodO7XKELZMcY10QRCAD9CI2t');
        if(d.user){
            if( !(await checkConnectionId(d.ConnectionId,d.user))){res.status(400).send("invalid token");return;}
            req.userIdAuth={userID:d.user,ConnectionId:d.ConnectionId};next();
        }
        else{res.status(400).send("invalid token")}
    }
    else{
        res.status(400).send("login with correct credentials");
    }
}