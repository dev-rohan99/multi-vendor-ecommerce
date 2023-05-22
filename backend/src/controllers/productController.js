import brandModel from "../models/brand/brand.js";
import productModel from "../models/product/product.js";
import createError from "../utility/createError.js";
import productPhotoUpload from "../utility/productPhotoUpload.js";


/**
 * create product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const createNewProduct = async (req, res, next) => {
  try {
    
    const { photo, discount, price } = req.body;
    const getRole = await brandModel.findById(req.userId);
    if(getRole.role === "admin" || getRole.role === "seller"){
      let discountPriceCal = "";
      if(discount !== ""){
        discountPriceCal = (price * (100 - discount)) / 100;
      }
      const photoPath = await productPhotoUpload(photo);
      const colorPhotoPath = await productPhotoUpload(req.body.color);
      const product = await productModel.create({
        ...req.body,
        creatorId : req.userId,
        photo : photoPath,
        color : colorPhotoPath,
        brand : getRole.name,
        discountPrice : discountPriceCal
      });
  
      if(product){
        res.status(200).json({
          message: "Product added successfully",
          product,
        });
      }else{
        next(createError(404, "Product added fail"));
      }
    }else{
      next(createError(401, "You are a user you can't create any product! If you want to sell on modern you must have a seller account."));
    }

  }catch(error){
    next(error);
  }
};

/**
 * get all product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getAllProduct = async (req, res, next) => {
  try {

    const fillters = {
      ...(req.query.title && {title : req.query.title}),
      ...(req.query.status && {status : req.query.status}),
      ...(req.query.minPrice || req.query.maxPrice ? {
        price : {
          ...(req.query.minPrice && {$gte : req.query.minPrice}),
          ...(req.query.maxPrice && {$lte : req.query.maxPrice})
        }
      } : {})
    };
    
    const product = await productModel.find(fillters);
    if(product){
      res.status(200).json({
        message: "Product got successfully",
        product,
      });
    }else{
      next(createError(404, "Product got fail"));
    }
    
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};

/**
 * get single product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getSingleProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await productModel.findById(id);
    if (product) {
      res.status(200).json({
        message: "Product got successfully",
        product,
      });
    } else {
      next(createError(404, "Product not found"));
    }
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};

/**
 * update product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getRole = await brandModel.findById(req.userId);
    if(getRole.role === "admin" || getRole.role === "seller"){
      const product = await productModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (product) {
        res.status(200).json({
          message: "Product updated successfully",
          product,
        });
      } else {
        next(createError(404, "Product not found"));
      }
    }else{
      next(createError(401, "You are a user you can't update any product! If you want to sell on modern you must have a seller account."));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * delete product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getRole = await brandModel.findById(req.userId);
    if(getRole.role === "admin" || getRole.role === "seller"){
      const product = await productModel.findByIdAndDelete(id);
      if (product) {
        res.status(200).json({
          message: "Product deleted successfully",
          product,
        });
      } else {
        next(createError(404, "Product not found"));
      }
    }else{
      next(createError(401, "You are a user you can't delete any product! If you want to sell on modern you must have a seller account."));
    }
  } catch (error) {
    next(error);
  }
};
