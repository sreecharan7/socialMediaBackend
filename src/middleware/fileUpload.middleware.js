import multer from "multer";
const storageConfig=multer.diskStorage({
    destination:(req,file,cb)=>{
        let dynamicStorage="public/files/";//defaultstorage
        if(req.storageFolder){
            dynamicStorage=req.storageFolder;
        }
        cb(null,dynamicStorage);
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+"-"+file.originalname;
        cb(null,name);
    }
})
export const uploadFile=multer({
    storage:storageConfig
})