import userModel from "../models/user/userModel.js";
import createError from "../utility/createError.js";
import { tokenCreate } from "../utility/token.js";
import { isEmail, isPhone } from "../utility/validate.js";
import verifyPassword from "../utility/verifyPassword.js";
import hashPassword from "../utility/hashPassword.js"

/**
 * user register
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const userRegister = async (req, res, next) => {

    try{

        let postBody = req.body;
        const { firstName, surName, email, phone, password, birthDate, birthMonth, birthYear, gender } = req.body;

        if(!firstName || !surName || !password || !birthDate || !birthMonth || !birthYear || !gender){
            return next(createError(400, 'All fields are required!'));
        }

        let emailUser = null;
        if(isEmail(email)){
            const userEmail = await userModel.findOne({email : email});
            if(userEmail){
                return next(createError(400, 'This email address already exists!'));
            }else if(!isEmail(email)){
                return next(createError(400, 'Invalid email address!'));
            }else{
                emailUser = email;
            }
        }

        let phoneUser = null;
        if(isPhone(phone)){
            const userPhone = await userModel.findOne({phone : phone});
            if(userPhone){
                return next(createError(400, 'This phone number already exists!'));
            }else if(!isPhone(phone)){
                return next(createError(400, 'Invalid phone address!'));
            }else{
                phoneUser = phone;
            }
        }

        let user = await userModel.create({
            ...postBody,
            email : emailUser,
            phone : phoneUser,
            password : hashPassword(password)
        });

        if(!user){
            return next(createError(400, 'User register failed!'));
        }

        if(user){
            res.status(200).json({
                user : user
            });
        }

    }catch(err){
        return next(createError(err));
    }

}

/**
 * user login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const userLogin = async (req, res, next) => {

    try{

        const {phoneOrEmail, password} = req.body;

        if(isEmail(phoneOrEmail)){

            const loginUser = await userModel.findOne({email : phoneOrEmail});

            if(!loginUser){
                return next(createError(400, "Email user not found!"));
            }else{

                if(!verifyPassword(password, loginUser.password)){
                    return next(createError(400, "Password not matched! Try again!"));
                }else{

                    const tokenGen = tokenCreate({ id : loginUser._id}, "365d");

                    res.status(200).cookie("userToken", tokenGen).json({
                        message : "User login successfull",
                        user : loginUser,
                        token : tokenGen
                    });

                }

            }

        }else if(isPhone(phoneOrEmail)){

            const loginUser = await userModel.findOne({phone : phoneOrEmail});

            if(!loginUser){
                return next(createError(400, "Email user not found!"));
            }else{

                if(!verifyPassword(password, loginUser.password)){
                    return next(createError(400, "Password not matched! Try again!"));
                }else{
                    
                    const tokenGen = tokenCreate({ id : loginUser._id}, "365d");

                    res.status(200).cookie("userToken", tokenGen).json({
                        message : "User login successfull",
                        user : loginUser,
                        token : tokenGen
                    });

                }

            }

        }else{
            return next(createError(400, "Invalid email or phone!"));
        }

    }catch(err){
        return next(err);
    }

}

/**
 * user details update
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const userDetailsUpdate = async (req, res, next) => {
    try{

        const { id } = req.params;
        const findUserRole = await userModel.findById(req.userId);

        if(findUserRole.role === "user"){
            const user = await userModel.findByIdAndUpdate(id, req.body, {
              new: true,
            });
      
            if(user){
              res.status(200).json({
                message: "Updated successfully!",
                user,
              });
            }else{
              next(createError(404, "Update failed!"));
            }
        }else{
            return next(createError(401, "Something went wrong!"));
        }

    }catch(error){
        next(error);
    }
}

