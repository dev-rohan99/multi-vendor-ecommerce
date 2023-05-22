import mongoose from "mongoose";


const userDataSchema = mongoose.Schema({

    firstName : {
        type : String,
        required : true,
        trim : true
    },

    surName : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        trim : true,
        unique : true
    },

    phone : {
        type : String,
        trim : true,
        unique : true,
    },

    username : {
        type : String,
        trim : true,
        unique : true,
    },

    password : {
        type : String,
        trim : true,
        required : true,
    },

    city : {
        type : String,
        trim : true,
        default : null
    },

    area : {
        type : String,
        trim : true,
        default : null
    },

    address : {
        type : String,
        trim : true,
        default : null
    },

    deliveryZone : {
        type : String,
        enum : ["Home", "Office"],
        default : "Home"
    },

    birthDate : {
        type : String,
        required : true
    },

    birthMonth : {
        type : String,
        required : true
    },

    birthYear : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        required : true,
        enum : ["male", "female", "other"]
    },

    role : {
        type : String,
        enum : ["user"],
        default : "user"
    },

    avatar : {
        type : String,
        default : ""
    }

}, {
    timestamps : true
});

const userModel = mongoose.model("users", userDataSchema);
export default userModel;

