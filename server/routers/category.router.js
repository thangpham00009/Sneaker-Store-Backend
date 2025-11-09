import express from "express";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { admin } from "../middlewares/auth.middleware.js";
import { uploadCategory } from "../middlewares/upload.middleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/api/v1/categories", getAllCategories);
categoryRouter.get("/api/v1/categories/:slug", getCategoryBySlug);
categoryRouter.post(
  "/api/v1/categories",
  admin,
  uploadCategory.single("image"),
  createCategory
);
categoryRouter.put(
  "/api/v1/categories/:id",
  admin,
  uploadCategory.single("image"),
  updateCategory
);
categoryRouter.delete("/api/v1/categories/:id", admin, deleteCategory);

export default categoryRouter;
