import express from "express";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

 categoryRouter.get("/api/v1/categories", getAllCategories);
 categoryRouter.get("/api/v1/categories/:slug", getCategoryBySlug);
 categoryRouter.post("/api/v1/categories", createCategory);
 categoryRouter.put("/api/v1/categories/:id", updateCategory);
 categoryRouter.delete("/api/v1/categories/:id", deleteCategory);

export default categoryRouter;
