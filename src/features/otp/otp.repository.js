import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import { customError } from "../../middleware/error.middleware.js";

const otpModel = mongoose.model("otp", otpSchema);

export class otpRepository {
    create = async (otp, email) => {
        try {
        const otpData = await otpModel.create({ otp, email });
        return otpData;
        } catch (error) {
            if(error instanceof mongoose.Error.ValidationError){
                throw new customError(400,error.message);
            }
        throw error;
        }
    };
    verify = async (email,otp) => {
        try {
        const otpData = await otpModel.findOne({ email });
        if( otpData.otp===otp){return true;}
        else{return false;}
        } catch (error) {
            throw new customError(500,"something went wrong ,problem with the data or otp is expired");
        }
    };
}