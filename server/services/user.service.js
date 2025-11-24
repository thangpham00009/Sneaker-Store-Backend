import bcrypt from "bcrypt";
import { User } from "../models/index.js";

import {
  generateUserTokens,
  verifyUserRefreshToken,
} from "../middlewares/user.middleware.js";

// REGISTER USER
export const registerUserService = async (userData) => {
  try {
    const existingUser = await User.findOne({
      where: { username: userData.username },
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// LOGIN USER
export const loginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid email or password");

    const tokens = generateUserTokens(user);
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  } catch (error) {
    throw error;
  }
};

// REFRESH TOKEN USER
export const refreshUserTokenService = async (refreshToken) => {
  try {
    const decoded = verifyUserRefreshToken(refreshToken);
    const user = await User.findByPk(decoded.id);

    if (!user) throw new Error("User not found");

    return generateUserTokens(user);
  } catch (error) {
    throw error;
  }
};

// GET USER PROFILE
export const getUserProfileService = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
