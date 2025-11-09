import express from "express";
import cors from "cors";
import { connectDB, sequelize } from "./config/connect.js";
import categoryRouter from "./routers/category.router.js";
import brandRouter from "./routers/brand.router.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

(async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: false, alter: false });
    app.use(categoryRouter);
    app.use(brandRouter);
    app.listen(port, () => {
      console.log(`Server đang chạy trên port ${port}`);
    });
  } catch (err) {
    console.error("Lỗi khi khởi động server:", err);
    process.exit(1);
  }
})();
