import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path, { resolve } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDatabase from "./src/config/database/database.js";
import userRouter from "./src/routes/userRouter.js";
import productRoute from "./src/routes/productRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import brandRoute from "./src/routes/brandRoute.js";
import tagRoute from "./src/routes/tagRoute.js";
import reviewRoute from "./src/routes/reviewRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import errHandler from "./src/middlewares/common/errHandler.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin : "http://localhost:3000",
  credentials : true
}));
app.use(cookieParser());

app.use(express.static(path.join(resolve(), "public")));

// database connection
ConnectDatabase();

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/tags", tagRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/orders", orderRoute);

// error handler
app.use(errHandler);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on PORT ${PORT}!`.bgGreen);
  }
});
