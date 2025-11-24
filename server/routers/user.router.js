import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken, 
  getUserProfile,
} from "../controllers/user.controller.js";
import { user } from "../middlewares/user.middleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/api/v1/user/register", registerUser);
userRouter.post("/api/v1/user/login", loginUser);
userRouter.post("/api/v1/user/refresh-token", refreshUserToken);

// Protected routes
userRouter.post("/api/v1/user/logout", user, logoutUser);
userRouter.get("/api/v1/user/profile", user, getUserProfile);
export default userRouter;