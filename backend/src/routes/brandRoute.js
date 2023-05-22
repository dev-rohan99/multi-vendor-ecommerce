import express from "express";
import { brandOwnerLogin, createBrand, deleteBrand, getBrand, getSingleBrand, updateBrand } from "../controllers/brandController.js";
import { brandOwnerMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();


router.post("/", createBrand);
router.post("/owner/login", brandOwnerLogin);
router.get("/", getBrand);
router.get("/:id", getSingleBrand);
router.patch("/:id", brandOwnerMiddleware, updateBrand);
router.delete("/:id", brandOwnerMiddleware, deleteBrand);


export default router;

