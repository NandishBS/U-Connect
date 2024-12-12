import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import { Readable } from 'stream';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            console.log("ERROR :: uploadOnCloudinary :: could not find the fileBuffer");
            return reject(new Error("File buffer is required"));
        }

        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto', 
                folder: 'u-connect', 
            },
            (error, result) => {
                if (error) {
                    console.log("Error uploading stream:", error);
                    return reject(error); 
                }
                console.log("Upload successful, file URL:", result.url);
                resolve(result); 
            }
        );

        bufferStream.pipe(stream);
    });   
}

const deleteOnCloudinary = async (url) => {
    try {
        const urlParts = url.split('/');
        const urlWithExtension = urlParts[urlParts.length-2] + "/" + urlParts[urlParts.length - 1]
        const publicId = urlWithExtension.split('.')[0];

        console.log(publicId)

        if(!publicId){
            return null;
        }
    
        cloudinary.uploader.destroy(publicId, (error, result) => {
            console.log(error)
        });
    } catch (error) {
        throw error
    }
}

export {uploadOnCloudinary ,deleteOnCloudinary }

    
  

 
