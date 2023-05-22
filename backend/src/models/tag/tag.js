import mongoose from "mongoose";

const tagSchema = mongoose.Schema({

  creatorId : {
    type: String,
    required : true
  },

  tagName : { 
    type: String,
    required : true
  },

  tagSlug : { 
    type: String
  }
  
}, {
  versionKey: false,
  timestamps : true
});

const tagModel = mongoose.model("tag", tagSchema);
export default tagModel
