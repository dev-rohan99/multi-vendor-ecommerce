import express from "express";
const router = express.Router();
import { createNewProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { brandOwnerMiddleware } from "../middlewares/userMiddleware.js";

router.post("/", brandOwnerMiddleware, createNewProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.patch("/:id", brandOwnerMiddleware, updateProduct);
router.delete("/:id", brandOwnerMiddleware, deleteProduct);

export default router;
