import reviewModel from "../../models/review/reviewModel.js";
import userModel from "../../models/user/userModel.js";
import createError from "../../utility/createError.js";


/**
 * create new review
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const createNewReview = async (req, res, next) => {
    try{
        
        const findRole = await userModel.findOne(req.userId);
        if(findRole.role === "user") return next(createError(403, "Only customer can create review!"));

        const newReview = new reviewModel({
            ...req.body,
            creatorId : req.userId,
            productId : req.body.productId
        });

        const review = await reviewModel.findOne({
            creatorId : req.userId,
            productId : req.body.productId
        });

        if(review) return next(createError(403, "You have already created a review for this product!"));

        await newReview.save();

        await gigModel.findByIdAndUpdate(req.body.productId, {
            $inc : { reviewRating : req.body.reviewRating, totalReview : 1 }
        });

        res.status(201).json({
            review : newReview
        })

    }catch(err){
        next(err);
    }
}


