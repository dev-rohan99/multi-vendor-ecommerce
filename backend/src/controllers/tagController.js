import brandModel from "../models/brand/brand.js";
import tagModel from "../models/tag/tag.js";
import createError from "../utility/createError.js";


/**
 * create tag
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const createTag = async (req, res, next) => {
  try {

    const findOwnerRole = await brandModel.findById(req.userId);
    if(findOwnerRole.role === "admin" || findOwnerRole.role === "seller"){
      const getTagSlug = req.body.tagName.split(" ").join("-").toLowerCase();
      const tag = await tagModel.create({
        ...req.body,
        creatorId : req.userId,
        tagSlug : getTagSlug
      });
      if(tag){
        res.status(201).json({
          message: "Tag create successfully!",
          tag,
        });
      }else{
        next(createError(404, "Tag added failed!"));
      }
    }else if(findOwnerRole.status === "pending" || findOwnerRole.status === "rejected"){
      if(findOwnerRole.status === "pending"){
        return next(createError(401, "Please wait utill admin approved your account status!"));
      }else if(findOwnerRole.status === "rejected"){
        return next(createError(401, "Your account has been banned!"));
      }
    }else{
      next(createError(401, "You are a user you can't create any tag! If you want to sell on modern you must have a seller account."));
    }

  }catch(error){
    next(error);
  }
};

/**
 * get tags
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getAllTag = async (req, res, next) => {
  try{

    const tag = await tagModel.find();
    if(tag){
      res.status(200).json({
        message: "Tag founded successfully!",
        tag,
      });
    }else{
      next(createError(404, "Tags not found!"));
    }

  }catch(error){
    next(error);
  }
};

/**
 * get single tag
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getSingleTag = async (req, res, next) => {
  try {
    
    const { id } = req.params;
    const tag = await tagModel.findById(id);
    if(tag){
      res.status(200).json({
        message: "Tag founded successfully!",
        tag,
      });
    }else{
      next(createError(404, "Tag not found!"));
    }

  }catch(error){
    next(error);
  }
};

/**
 * update tag
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOwnerRole = await brandModel.findById(req.userId);

    const tagFind = await categoryModel.findById({_id : id});
    if(req.userId !== tagFind.creatorId) return next(createError(404, "User ID does't match!"));

    if(findOwnerRole.role === "seller" || findOwnerRole.role === "admin"){
      const tag = await tagModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if(tag){
        res.status(200).json({
          message: "Tag updated successfully!",
          tag,
        });
      }else{
        next(createError(404, "Tag update failed!"));
      }
    }else if(findOwnerRole.status === "pending" || findOwnerRole.status === "rejected"){
      if(findOwnerRole.status === "pending"){
        return next(createError(401, "Please wait utill admin approved your account status!"));
      }else if(findOwnerRole.status === "rejected"){
        return next(createError(401, "Your account has been banned!"));
      }
    }else{
      return next(createError(401, "You are a user you can't update any tag! If you want to sell on modern you must have a seller account."));
    }
  }catch(error){
    next(error);
  }
};

/**
 * delete tag
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const deleteTag = async (req, res, next) => {
  try {

    const { id } = req.params;
    const findOwnerRole = await brandModel.findById(req.userId);

    const tagFind = await categoryModel.findById({_id : id});
    if(req.userId !== tagFind.creatorId) return next(createError(404, "User ID does't match!"));

    if(findOwnerRole.role === "seller" || findOwnerRole.role === "admin"){
      const tag = await tagModel.findByIdAndDelete(id);
      if(tag){
        res.status(200).json({
          message: "Tag deleted successfully!",
          tag,
        });
      }else{
        next(createError(404, "Tag delete failed!"));
      }
    }else if(findOwnerRole.status === "pending" || findOwnerRole.status === "rejected"){
      if(findOwnerRole.status === "pending"){
        return next(createError(401, "Please wait untill admin approved your account status!"));
      }else if(findOwnerRole.status === "rejected"){
        return next(createError(401, "Your account has been banned!"));
      }
    }else{
      return next(createError(401, "You are a user you can't delete any tag! If you want to sell on modern you must have a seller account."));
    }
    
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};
