
const jwt = require("jsonwebtoken")



const User = require("../models/user.model");
const {
  hashPasswordGenrate,
  comparePassword,
} = require("../utils/password.utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.utils");

const userRegisterController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {


  const checkUserAlready = await User.findOne({ email });

  if (checkUserAlready) {
    return res.json({
      message: "User already exists",
      success: false,
    });
  }

    const hashPassword = await hashPasswordGenrate(password);

    // console.log("hash password : ", hashPassword);

    const user = await User.create({
      email,
      firstName,
      lastName,
      passwordHash: hashPassword,
    });

    const accessToken = generateAccessToken(user._id.toString());
    
    
    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

const refreshToken = generateRefreshToken({
  userId: user._id.toString(),
  refreshExpiresAt,
});

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: refreshExpiresAt - Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user._id.toString());
    
    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

const refreshToken = generateRefreshToken({
  userId: user._id.toString(),
  refreshExpiresAt,
});

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: refreshExpiresAt - Date.now(),
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const userMeController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "firstName lastName email",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing. Please login again.",
    });
  }

  try {
    // Step 1: Verify existing refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Step 2: Check original fixed expiry
    const remainingMs = decoded.refreshExpiresAt - Date.now();

    if (
      !decoded.userId ||
      !decoded.refreshExpiresAt ||
      remainingMs <= 0
    ) {
      res.clearCookie("accessToken", { path: "/" });
      res.clearCookie("refreshToken", { path: "/" });

      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Step 3: Generate new access token
    const accessToken = generateAccessToken(decoded.userId);

    // Step 4: Rotate refresh token without extending expiry
    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      refreshExpiresAt: decoded.refreshExpiresAt,
    });

    // Step 5: Set new access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    // Step 6: Set rotated refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: remainingMs,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    return res.status(401).json({
      success: false,
      message: "Refresh token invalid or expired. Please login again.",
    });
  }
};


const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




module.exports = {
  userRegisterController,
  userLoginController,
  userMeController,
  refreshTokenController,
  userLogoutController
};










