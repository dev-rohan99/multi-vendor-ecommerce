import brandModel from "../models/brand/brand.js";
import createError from "../utility/createError.js";
import fs from "fs";
import path from "path";
import hashPassword from "../utility/hashPassword.js";
import avatarUpload from "../utility/avatarUpload.js";
import verifyPassword from "../utility/verifyPassword.js";
import { tokenCreate } from "../utility/token.js";
import { isEmail, isPhone } from "../utility/validate.js";


/**
 * create brand
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const createBrand = async (req, res, next) => {
  try {

    const { email, phone, password, avatar } = req.body;

    const findEmail = await brandModel.findOne({email : email});
    if(findEmail){
      return next(createError(400, "This email address is already exist! Please enter another email address."));
    }

    const findPhone = await brandModel.findOne({phone : phone});
    if(findPhone){
      return next(createError(400, "This phone number is already exist! Please enter another phone number."));
    }

    const avatarPath = await avatarUpload(avatar);
    const brand = await brandModel.create({
      ...req.body,
      password : hashPassword(password),
      avatar : avatarPath
    });

    if(brand){
      return res.status(200).json({
        message: "Brand added successfully",
        brand,
      });
    }else{
      return next(createError(404, "Brand added failed"));
    }

  }catch (error){
    return next(error);
  }
};

/**
 * brand owner login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const brandOwnerLogin = async (req, res, next) => {
  try{

    const {phoneOrEmail, password} = req.body;

    if(isEmail(phoneOrEmail)){

        const loginUser = await brandModel.findOne({email : phoneOrEmail});

        if(!loginUser){
          return next(createError(400, "Email user not found!"));
        }else{

          if(loginUser.status === "pending"){
            return next(createError(401, "Your status still now pending! Untill your status approved you can't login your account."));
          }else if(loginUser.status === "rejected"){
            return next(createError(401, "Your status is now rejected so that you can't login your account."));
          }else{
            if(!verifyPassword(password, loginUser.password)){
                return next(createError(400, "Password not matched! Try again!"));
            }else{
                const tokenGen = tokenCreate({ id : loginUser._id}, "365d");

                res.status(200).cookie("accessToken", tokenGen).json({
                    message : "Welcome back!",
                    user : loginUser,
                    token : tokenGen
                });
            }
          }

        }

    }else if(isPhone(phoneOrEmail)){

        if(!phoneOrEmail || !password){
            return next(createError(400, "All fields are required!"));
        }

        const loginUser = await brandModel.findOne({phone : phoneOrEmail});

        if(!loginUser){
            return next(createError(400, "Email user not found!"));
        }else{
          
          if(loginUser.status === "pending"){
            return next(createError(401, "Your status still now pending! Untill your status approved you can't login your account."));
          }else if(loginUser.status === "rejected"){
            return next(createError(401, "Your status is now rejected so that you can't login your account."));
          }else{
            if(!verifyPassword(password, loginUser.password)){
                return next(createError(400, "Password not matched! Try again!"));
            }else{
                const tokenGen = tokenCreate({ id : loginUser._id}, "365d");

                res.status(200).json({
                    message : "User login successfull",
                    user : user,
                    token : tokenGen
                });
            }
          }

        }

    }else{
        return next(createError(400, "Invalid email or phone!"));
    }

  }catch(error){
    next(error);
  }
}

/**
 * get brand
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getBrand = async (req, res, next) => {
  try{
    const brand = await brandModel.find();
    if (brand) {
      res.status(200).json({
        message: "Brand data founded successfully",
        brand,
      });
    } else {
      next(createError(404, "Brand data not found!"));
    }
  }catch (error) {
    next(error);
  }
};

export const getSingleBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findById(id);
    if (brand) {
      res.status(200).json({
        message: "Brand got successfully",
        brand,
      });
    } else {
      next(createError(404, "Brand not found"));
    }
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndUpdate(id, ...req.body, {
      new: true,
    });
    if (brand) {
      res.status(200).json({
        message: "Brand updated successfully",
        brand,
      });
    } else {
      next(createError(404, "Brand not found"));
    }
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndDelete(id);
    const photo = brand.photo;
    fs.unlink(path.join(path.resolve(), `/public/images/${photo}`), () => {});

    if (brand) {
      res.status(200).json({
        message: "Brand deleted successfully",
        brand,
      });
    }
  } catch (error) {
    next(createError(500, "There is something wrong"));
  }
};
