import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {errorShower} from "./src/middleware/error.middleware.js"
import {connect} from "./src/database/config.js"
import userRouter from "./src/features/users/users.router.js"
import otpRouter from "./src/features/otp/otp.router.js"
import auth from "./src/middleware/jwt.middleware.js"
import postRouter from "./src/features/posts/posts.router.js"
import likeRouter from "./src/features/likes/likes.router.js"
import friendRouter from "./src/features/friends/friends.router.js";
import logger from "./src/middleware/looger.middleware.js";
import apiDocs from './api-docs-swagger.json' assert {type:'json'};
import swagger from "swagger-ui-express";

const app = express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logger);
app.use("/api/users",userRouter);
app.use("/api/otp",otpRouter);
app.use("/api/posts",auth,postRouter);
app.use("/api/likes",auth,likeRouter);
app.use("/api/friends",auth,friendRouter);

app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

app.use(errorShower);
app.use((req,res)=>{res.status(404).send("page is not found")})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    connect();
})