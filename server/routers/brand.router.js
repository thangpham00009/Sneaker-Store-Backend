import express from "express";
import {
  getAllBrands,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

const brandRouter = express.Router();

brandRouter.get("/api/v1/brands", getAllBrands);
brandRouter.get("/api/v1/brands/:slug", getBrandBySlug);
brandRouter.post("/api/v1/brands", createBrand);
brandRouter.put("/api/v1/brands/:id", updateBrand);
brandRouter.delete("/api/v1/brands/:id", deleteBrand);

export default brandRouter;
