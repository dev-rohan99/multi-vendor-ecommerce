import orderModel from "../../models/order/order.js";
import productModel from "../../models/product/product.js";
import createError from "../../utility/createError.js";


/**
 * create order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const createOrder = async (req, res, next) => {
    try{

        const product = await productModel.findById(req.params.id);

        const newOrder = new orderModel({
            productId : product._id,
            productImage : product.photo[0],
            productTitle : product.productTitle,
            price : (product.discountPrice ? product.discountPrice : product.price),
            quantity : req.body.quantity,
            size : req.body.size,
            color : req.body.color,
            sellerId : product.creatorId,
            buyerId : req.userId,
            paymentIntent : "temporary"
        });
        await newOrder.save();

        if(newOrder){
            res.status(201).json({
                order : newOrder
            })
        }

    }catch(error){
        console.log(error);
    }
}

/**
 * get orders
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const getOrders = async (req, res, next) => {
    try{

        const orders = await orderModel.find({
            ...(req.role === "user" ? {sellerId : req.userId} : {buyerId : req.userId}),
            isComplete: true,
        });
        
        if(orders){
            res.status(200).json({
                orders : orders
            })
        }

    }catch(error){
        next(error);
    }
}

/**
 * update order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const updateOrder = async (req, res, next) => {
    try{

        if((req.role !== "seller" || req.role !== "admin") && req.status !== "approved"){
            return next(createError(401, "You can't update any product for your authentication issue!"))
        }else{
            const order = await orderModel.findByIdAndUpdate({ _id : req.params.id }, req.body, {
                new : true
            });

            if(order){
                res.status(200).json({
                    order : order
                })
            }
        }

    }catch(error){
        next(error);
    }
}

