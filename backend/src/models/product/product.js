import mongoose, { Schema, SchemaType } from "mongoose";

const productSchema = mongoose.Schema(
  {
    creatorId : {
      type : String,
      required : true
    },

    title : { 
      type : String,
      required : true
    },

    price : { 
      type : Number,
      required : true
    },

    discountPrice : { 
      type : Number
    },

    discount : { 
      type : Number
    },

    shortDescription : { 
      type : String
    },

    description : { 
      type : String
    },

    photo : { 
      type : Array,
      required : true
    },

    stock : { 
      type : Number
    },

    status : {
      type : String,
      enum : ["In stock", "Out off stock"],
      required : true
    },

    category : {
      type : Array,
      default : []
    },

    tag : {
      type : Array,
      default : []
    },

    color : {
      type : Array,
      default : []
    },

    size : {
      type : Array,
      default : []
    },

    brand : {
      type : String
    },

    sku : { 
      type : String 
    },

    totalReview : {
      type : Number,
      default : 0
    },

    reviewRating : {
        type : Number,
        default : 0
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;
