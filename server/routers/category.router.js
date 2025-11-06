import express from "express";
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

 categoryRouter.get("/categories", getAllCategories);
 categoryRouter.get("/categories/:slug", getCategoryBySlug);
 categoryRouter.post("/categories", createCategory);
 categoryRouter.put("/categories/:id", updateCategory);
 categoryRouter.delete("/categories/:id", deleteCategory);

export default categoryRouter;
