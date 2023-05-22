import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    creatorId : {
      type: String,
      required : true
    },

    categoryName : {
      type: String,
      unique : true
    },

    categorySlug : {
      type: String
    },

    photo: {
      type: String
    },
    
    feature: {
      type: Boolean,
      default: false,
    }
  },
  {
    versionKey: false,
  }
);

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
