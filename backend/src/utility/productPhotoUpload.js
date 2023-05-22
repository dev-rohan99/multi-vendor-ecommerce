import cloudinary from "cloudinary";


const productPhotoUpload = async (images) => {

    try {
        // Configuration 
        cloudinary.config({
          cloud_name: "db31ne0yv",
          api_key: "331148642149157",
          api_secret: "f-PQp1POsQb5Uq3tuqQEhm3wweg"
        });
    
        const urls = [];
    
        for (const image of images) {
          const res = await cloudinary.uploader.upload(image, {
            folder: "modern/product",
            public_id: "modern/product/productImg"
          });
    
          urls.push(res.secure_url);
        }
    
        return urls;
    } catch (error) {
        throw error;
    }
}

export default productPhotoUpload;

