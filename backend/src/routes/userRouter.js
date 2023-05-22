import { userRegister, userLogin, userDetailsUpdate } from "../controllers/userController.js";
import express from "express";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();


// user routes
router.post('/register', userRegister);
router.post('/login', userLogin);
router.put('/update', userMiddleware, userDetailsUpdate);


export default router;
