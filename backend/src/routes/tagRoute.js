import express from "express";
const router = express.Router();
import { createTag, deleteTag, getSingleTag, getAllTag, updateTag } from "../controllers/tagController.js";
import { brandOwnerMiddleware } from "../middlewares/userMiddleware.js";


router.post('/', brandOwnerMiddleware, createTag);
router.get("/", getAllTag);
router.get("/:id", getSingleTag);
router.patch("/:id", brandOwnerMiddleware, updateTag);
router.delete("/:id", brandOwnerMiddleware, deleteTag);


export default router;

