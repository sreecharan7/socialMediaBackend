export class customError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
    }
}

export function errorShower(err,req,res,next){
    if(err instanceof customError){
        res.status(err.statusCode).send({error:err.message});
    }
    else{
        console.log(err);
        res.status(500).send("oops something went wrong!!");
    }
}