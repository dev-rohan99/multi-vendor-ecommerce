import jwt from "jsonwebtoken"
import createError from "../utility/createError.js";


/**
 * middleware for user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const userMiddleware = (req, res, next) => {
    try{

        const token = req.cookies.accessToken;
        if(!token) return next(createError(401, 'You are not authenticated!'));

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if(err) return next(createError(403, 'Token is not valid!'));
            req.userId = payload.id;
            req.role = payload.role;
            next();
        });

    }catch(error){
        return next(error);
    }
}

/**
 * middleware for brand owners
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const brandOwnerMiddleware = (req, res, next) => {
    try{

        const token = req.cookies.accessToken;
        if(!token) return next(createError(401, 'You are not authenticated!'));

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if(err) return next(createError(403, 'Token is not valid!'));
            req.userId = payload.id;
            req.role = payload.role;
            req.status = payload.status;
            next();
        });

    }catch(error){
        return next(error);
    }
}

