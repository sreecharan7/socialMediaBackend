import nodemailer from 'nodemailer';
export const mailer=async (req,res,next)=>{
    try {
        const {email}=req.body;
        const senderEmailer="testemails369@gmail.com"
        const senderPass="upwxvjknbovnhbno"
        const otp=Math.floor(100000 + Math.random() * 900000);
        req.body.otp=otp;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmailer,
                pass: senderPass
            }
        });
        const mailOptions = {
            from: senderEmailer,
            to: email,
            subject: 'OTP for login',
            text: `your otp is ${otp}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message:"otp sent successfully, it will expire by 60 seconds"});
            }
        });
        next();
    } catch (error) {
        next(error);
    }

}