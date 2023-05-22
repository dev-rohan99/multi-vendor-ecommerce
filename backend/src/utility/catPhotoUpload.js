import cloudinary from "cloudinary";


const catPhotoUpload = async (image) => {

    try{

        // Configuration 
        cloudinary.config({
            cloud_name: "db31ne0yv",
            api_key: "331148642149157",
            api_secret: "f-PQp1POsQb5Uq3tuqQEhm3wweg"
        });
  
        // Upload
        const res = await cloudinary.uploader.upload(image, {
            folder: "modern/categories",
            public_id : "modern/categories/categoriesImg"
        });
        
        return res.secure_url;

    }catch(error){
        console.log(error);
    }
}

export default catPhotoUpload;
