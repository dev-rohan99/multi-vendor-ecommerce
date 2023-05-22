import mongoose from "mongoose";

const ConnectDatabase =  async () => {
    try{
        mongoose.set("strictQuery", false);
        const connection = process.env.MONGO_CONNECTION_STRING;
        await mongoose.connect(connection);
        console.log("Connected!".bgWhite.black);
    }catch(err){
        console.log(err);
    }
}

export default ConnectDatabase;
