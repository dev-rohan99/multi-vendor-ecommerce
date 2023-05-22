import jwt from "jsonwebtoken";

/**
 * create token
 * @param {*} payload 
 * @param {*} expires 
 * @returns 
 */

export const tokenCreate = (payload, expires) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : expires
    });
    return token;

}

/**
 * verify token
 * @param {*} token 
 * @returns 
 */

export const tokenVerify = (token) => {

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return verify;

}

