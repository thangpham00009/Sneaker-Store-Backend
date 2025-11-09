import express from "express";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { admin } from "../middlewares/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/api/v1/categories", getAllCategories);
categoryRouter.get("/api/v1/categories/:slug", getCategoryBySlug);
categoryRouter.post("/api/v1/categories", admin, createCategory);
categoryRouter.put("/api/v1/categories/:id", admin, updateCategory);
categoryRouter.delete(
  "/api/v1/categories/:id",
  admin,
  deleteCategory
);

export default categoryRouter;
