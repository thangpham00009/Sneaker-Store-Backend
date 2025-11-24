import {
  registerUserService,
  loginUserService,
  refreshUserTokenService,
  getUserProfileService,
} from "../services/user.service.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await loginUserService(
      email,
      password
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  res.cookie("userToken", "", { expires: new Date(0), httpOnly: true });
  res.cookie("userRefreshToken", "", { expires: new Date(0), httpOnly: true });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// REFRESH TOKEN
export const refreshUserToken = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.userRefreshToken;

    if (!oldRefreshToken) throw new Error("Refresh token not found");

    const { token, refreshToken: newRefreshToken } =
      await refreshUserTokenService(oldRefreshToken);

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("userRefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req.user.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
