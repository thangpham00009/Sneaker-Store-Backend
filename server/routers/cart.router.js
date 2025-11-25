import express from "express";
import cartController from "../controllers/cart.controller.js"; 
import { user } from "../middlewares/user.middleware.js"; 

const cartRouter = express.Router();

cartRouter.use(user);

cartRouter.get("/api/v1/cart", cartController.getCart);
cartRouter.post("/api/v1/cart", cartController.addToCart);
cartRouter.put("/api/v1/cart", cartController.updateCartItem);
cartRouter.delete("/api/v1/cart/:productId", cartController.removeCartItem);
cartRouter.delete("/api/v1/cart", cartController.clearCart);

export default cartRouter;
