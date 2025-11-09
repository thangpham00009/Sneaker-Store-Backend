import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { uploadProductImages } from "../middlewares/upload.middleware.js";
import { admin } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/api/v1/products", getAllProducts);
productRouter.get("/api/v1/products/:id", getProductById);

// Protected routes (require admin authentication)
productRouter.post(
  "/api/v1/products",
  admin,
  uploadProductImages,
  createProduct
);
productRouter.put(
  "/api/v1/products/:id",
    admin,
  uploadProductImages,
  updateProduct
);
productRouter.delete("/api/v1/products/:id",  admin, deleteProduct);

export default productRouter;
