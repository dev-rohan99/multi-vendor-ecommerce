import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {

    name : { 
      type: String,
      trim : true
    },

    email : {
      type : String,
      required : true,
      trim : true
    },

    phone : {
      type : String,
      required : true,
      trim : true
    },

    password : {
      type : String,
      required : true,
      trim : true
    },
    
    description : {
      type : String,
      default : ""
    },

    address : {
      type : String,
      required : true,
      trim : true
    },

    role : {
      type : String,
      enum : ["admin", "seller"],
      default : "seller"
    },

    status : {
      type : String,
      enum : ["pending", "approved", "rejected"],
      default : "pending"
    },

    avatar : {
      type : String,
      default : ""
    },

    zipCode : {
      type : String,
      required : true,
    },

    withdrawMethod : {
      type: Object,
      default : {}
    },

    availableBalance : {
      type : Number,
      default : 0,
    },

    transections : [
      {
        amount : {
          type : Number,
          required : true,
        }
      }
    ]

  },
  {
    versionKey: false,
    timestamps : true
  }
);

const brandModel = mongoose.model("brand", brandSchema);
export default brandModel;
