import brandModel from "../models/brand/brand.js";
import categoryModel from "../models/category/category.js";
import catPhotoUpload from "../utility/catPhotoUpload.js";
import createError from "../utility/createError.js";


/**
 * create category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const createCategory = async (req, res, next) => {
  try {

    const { photo } = req.body;

    const getRole = await brandModel.findById(req.userId);
    if(getRole.role === "admin"){

      const getCatSlug = req.body.categoryName.split(" ").join("-").toLowerCase();
      const photoPath = await catPhotoUpload(photo);
      const category = await categoryModel.create({
        ...req.body,
        creatorId : req.userId,
        categorySlug : getCatSlug,
        photo : photoPath,
      });

      if (category) {
        res.status(200).json({
          message: "Category added successfully",
          category,
        });
      }else if(getRole.role !== "admin"){
        return next(createError(401, "Only admin can create category!"));
      }else if(getRole.status === "pending" || getRole.status === "rejected"){
        if(getRole.status === "pending"){
          return next(createError(401, "Please wait untill admin approved your account status!"));
        }else if(getRole.status === "rejected"){
          return next(createError(401, "Your account has been banned!"));
        }
      }else{
        next(createError(404, "Category added failed!"));
      }

    }else{
      next(createError(401, "You are a user you can't create any product! If you want to sell on modern you must have a seller account."));
    }

  }catch(error){
    next(error);
  }
};

/**
 * get categories
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find();
    if(category){
      res.status(200).json({
        message: "Category got successfully",
        category,
      });
    }else{
      next(createError(404, "Category not found!"));
    }
  }catch(error){
    next(error);
  }
};

/**
 * get single category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (category) {
      res.status(200).json({
        message: "Category found successfull!",
        category,
      });
    }else{
      next(createError(404, "Category not found!"));
    }
  }catch(error){
    next(error);
  }
};

/**
 * update category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryFind = await categoryModel.findById({_id : id});
    if(req.userId !== categoryFind.creatorId) return next(createError(404, "User ID does't match!"));

    const category = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if(category){
      return res.status(200).json({
        message: "Category updated successfully!",
        category,
      });
    }else{
      next(createError(404, "Category not found!"));
    }
  }catch(error){
    next(error);
  }
};

/**
 * delete category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryFind = await categoryModel.findById({_id : id});
    if(req.userId !== categoryFind.creatorId) return next(createError(404, "User ID does't match!"));

    const category = await categoryModel.findByIdAndDelete(id);
    if(category){
      res.status(200).json({
        message: "Category deleted successfully",
        category,
      });
    }else{
      next(createError(404, "Category not found!"));
    }
  }catch(error){
    next(error);
  }
};
