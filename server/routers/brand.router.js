import express from "express";
import {
  getAllBrands,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";
import { admin } from "../middlewares/auth.middleware.js";

const brandRouter = express.Router();

brandRouter.get("/api/v1/brands", getAllBrands);
brandRouter.get("/api/v1/brands/:slug", getBrandBySlug);
brandRouter.post("/api/v1/brands", admin, createBrand);
brandRouter.put("/api/v1/brands/:id", admin, updateBrand);
brandRouter.delete("/api/v1/brands/:id", admin, deleteBrand);

export default brandRouter;
