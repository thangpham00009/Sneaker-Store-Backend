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
// Get all (admin)
export const adminGetAllUsersService = async () => {
  try {
    const users = await User.findAll({
      order: [["created_at", "DESC"]],
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

// get by id (admin)
export const adminGetUserByIdService = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

// UPDATE FULL USER (admin)
export const adminUpdateUserService = async (id, updateData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    // Nếu gửi password thì hash lại
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await user.update(updateData);

    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};


//delete user
export const adminDeleteUserService = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

// customer stats
export const adminUserStatsService = async () => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { is_active: true } });
    const bannedUsers = await User.count({ where: { is_active: false } });

    return {
      totalUsers,
      activeUsers,
      bannedUsers,
    };
  } catch (error) {
    throw error;
  }
};
