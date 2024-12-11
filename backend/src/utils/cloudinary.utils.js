import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log(localFilePath)
    try{
        if(!localFilePath){
            console.log("ERROR :: uploadOnCloudinary :: could not find the localfile path")
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        if(!response){
            return null
        }
        console.log("file is uploaded successfully on cloudinary",response.url)
        console.log(localFilePath)
        fs.unlinkSync(localFilePath)
        return(response)
    }catch(err){
        console.log("ERROR :: uploadOnCloudinary :: error while uploading :: ",err)
        fs.unlinkSync(localFilePath);
        return (null)
    }   
}

export {uploadOnCloudinary}

    
  

 
