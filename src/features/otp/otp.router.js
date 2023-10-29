import express from 'express';
import { otpController } from './otp.controller.js';
import {mailer} from "../../middleware/emailsender.middleware.js"
const router = express.Router();

const otpContr = new otpController();

router.post('/send',mailer, (req,res,next)=>{
    otpContr.create(req,res,next);
});

router.post('/verify', (req,res,next)=>{
    otpContr.verify(req,res,next);
});
router.put("/reset-password",(req,res,next)=>{
    otpContr.resetpassword(req,res,next);
})
export default router;