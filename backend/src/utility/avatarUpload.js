import cloudinary from "cloudinary";


const avatarUpload = async (image) => {

    try{

        // Configuration 
        cloudinary.config({
            cloud_name: "db31ne0yv",
            api_key: "331148642149157",
            api_secret: "f-PQp1POsQb5Uq3tuqQEhm3wweg"
        });
  
        // Upload
        const res = await cloudinary.uploader.upload(image, {
            folder: "modern/profile",
            public_id : "modern/profile/avatarImg"
        });
        
        return res.secure_url;

    }catch(error){
        console.log(error);
    }
}

export default avatarUpload;
