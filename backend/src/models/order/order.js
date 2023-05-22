import mongoose, { Schema, SchemaType } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    cart : {
      type : Array,
      required : true,
    },

    buyerId : {
      type : String,
      required : true
    },

    sellerId : {
      type : String,
      required : true
    },

    productId : {
      type : String,
      required : true
    },

    productImage : {
        type : String,
        required : false
    },

    productTitle : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : true
    },

    size : {
        type : String
    },

    color : {
        type : String
    },

    quantity : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum : ["Processing", "Shipped", "Delivered"],
        default : "Processing"
    },

    isComplete : {
        type : Boolean,
        default : false
    },

    paymentIntent : {
        type : String,
        required : true
    },

    paidAt:{
      type: Date,
      default: Date.now(),
    },
    
    deliveredAt: {
        type: Date,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
