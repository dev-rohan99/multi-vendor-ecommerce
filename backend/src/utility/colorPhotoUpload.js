import cloudinary from "cloudinary";


const colorPhotoUpload = async (image) => {

    try{

        // Configuration 
        cloudinary.config({
            cloud_name: "db31ne0yv",
            api_key: "331148642149157",
            api_secret: "f-PQp1POsQb5Uq3tuqQEhm3wweg"
        });
  
        // Upload
        const res = await cloudinary.uploader.upload(image, {
            folder: "modern/color",
            public_id : "modern/color/colorImg"
        });
        
        return res.secure_url;

    }catch(error){
        console.log(error);
    }
}

export default colorPhotoUpload;
