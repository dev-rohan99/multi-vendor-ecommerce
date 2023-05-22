import express from "express";
import { createCategory, deleteCategory, getCategory, getSingleCategory, updateCategory } from "../controllers/categoryController.js";
import { brandOwnerMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();



router.post('/', brandOwnerMiddleware, createCategory);
router.get("/", getCategory);
router.get("/:id", getSingleCategory);
router.patch("/:id", brandOwnerMiddleware, updateCategory);
router.delete("/:id", brandOwnerMiddleware, deleteCategory);

export default router;

