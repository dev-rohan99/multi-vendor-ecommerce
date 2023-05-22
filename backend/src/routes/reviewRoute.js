import express from "express";
const router = express.Router();
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { createNewReview } from "../controllers/review-controller/reviewController.js";


router.post('/:id', userMiddleware, createNewReview);


export default router;

