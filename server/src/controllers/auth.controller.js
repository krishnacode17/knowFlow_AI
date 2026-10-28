const jwt = require("jsonwebtoken");
const RefreshSession = require("../models/refreshSession.model");
const { randomUUID } = require("crypto");

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

    const userId = user._id.toString();
    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const jti = randomUUID();
    const accessToken = generateAccessToken(userId, jti);


    await RefreshSession.create({
      userId: user._id,
      jti,
      expiresAt: new Date(refreshExpiresAt),
    });

    const refreshToken = generateRefreshToken({
      userId,
      refreshExpiresAt,
      jti,
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
  
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  const clearAuthCookies = () => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
  };

  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      clearAuthCookies();

      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const { userId, refreshExpiresAt, jti } = decoded;

    const remainingMs = refreshExpiresAt - Date.now();

    if (!userId || !jti || !refreshExpiresAt || remainingMs <= 0) {
      clearAuthCookies();

      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Check whether this device's session is still active.
    const session = await RefreshSession.findOne({
      userId,
      jti,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      clearAuthCookies();

      return res.status(401).json({
        success: false,
        message: "Session expired or revoked. Please log in again.",
      });
    }

    const newAccessToken = generateAccessToken(userId, jti);

    // Preserve the same session ID and original expiry.
    const newRefreshToken = generateRefreshToken({
      userId,
      refreshExpiresAt,
      jti,
    });

    const remainingSeconds = Math.floor(remainingMs / 1000);

    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: remainingSeconds * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    clearAuthCookies();

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    console.error("Refresh token error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to refresh token",
    });
  }
};

const userLogoutController = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  const clearAuthCookies = () => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
  };

  try {
    const refreshToken = req.cookies?.refreshToken;

    // Revoke the current device's session if the refresh token is valid.
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        if (decoded.userId && decoded.jti) {
          await RefreshSession.updateOne(
            {
              userId: decoded.userId,
              jti: decoded.jti,
              revokedAt: null,
            },
            {
              $set: { revokedAt: new Date() },
            },
          );
        }
      } catch (error) {
        // An invalid or expired refresh token cannot identify
        // a session to revoke. Cookies will still be cleared.
        if (
          error.name !== "JsonWebTokenError" &&
          error.name !== "TokenExpiredError" &&
          error.name !== "NotBeforeError"
        ) {
          throw error;
        }
      }
    }

    clearAuthCookies();

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    clearAuthCookies();

    return res.status(500).json({
      success: false,
      message: "Unable to complete logout",
    });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  userMeController,
  refreshTokenController,
  userLogoutController,
};
