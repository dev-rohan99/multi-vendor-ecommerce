import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

    creatorId : {
        type: String,
        required : true
    },

    productId : {
        type: String,
        required : true
    },

    rating : {
        type : Number,
        required : true,
        enum : [1, 2, 3, 4, 5]
    },

    description : {
        type : String,
        required : true
    }
  
}, {
  versionKey: false,
  timestamps : true
});

const reviewModel = mongoose.model("reviews", reviewSchema);
export default reviewModel;
