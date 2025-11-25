import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, sequelize } from "./config/connect.js";
import categoryRouter from "./routers/category.router.js";
import brandRouter from "./routers/brand.router.js";
import adminRouter from "./routers/admin.router.js";
import productRouter from "./routers/product.router.js";
import promotionRouter from "./routers/promotion.router.js";
import dotenv from "dotenv";
import warehouseHistoryRouter from "./routers/warehouseHistory.router.js";
import userRouter from "./routers/user.router.js";
import cartRouter from "./routers/cart.router.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 8080;

(async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    app.use(categoryRouter);
    app.use(brandRouter);
    app.use(adminRouter);
    app.use(userRouter);
    app.use(productRouter);
    app.use(promotionRouter);
    app.use(warehouseHistoryRouter);
    app.use(cartRouter);
    app.listen(port, () => {
      console.log(`Server đang chạy trên port ${port}`);
    });
  } catch (err) {
    console.error("Lỗi khi khởi động server:", err);
    process.exit(1);
  }
})();
