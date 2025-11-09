import express from "express";
import {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotion.controller.js";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";
import { uploadPromotion } from "../middlewares/upload.middleware.js";

const promotionRouter = express.Router();

// Public routes
promotionRouter.get("/api/v1/promotions", getAllPromotions);
promotionRouter.get("/api/v1/promotions/:id", getPromotionById);

// Protected routes (require admin authentication)
promotionRouter.post(
  "/api/v1/promotions",
  authenticateAdmin,
  uploadPromotion.single("image"),
  createPromotion
);
promotionRouter.put(
  "/api/v1/promotions/:id",
  authenticateAdmin,
  uploadPromotion.single("image"),
  updatePromotion
);
promotionRouter.delete(
  "/api/v1/promotions/:id",
  authenticateAdmin,
  deletePromotion
);

export default promotionRouter;
