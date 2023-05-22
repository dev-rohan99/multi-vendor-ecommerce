import express from "express";
const router = express.Router();
import { brandOwnerMiddleware, userMiddleware } from "../middlewares/userMiddleware.js";
import { createOrder, getOrders, updateOrder } from "../controllers/order-controller/orderController.js";


router.post('/:id', userMiddleware, createOrder);
router.get('/', userMiddleware, getOrders);
router.put('/update/:id', brandOwnerMiddleware, updateOrder);


export default router;

