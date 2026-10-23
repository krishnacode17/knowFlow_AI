const express = require("express")
const { userRegisterController, userLoginController, userMeController, refreshTokenController, userLogoutController } = require("../controllers/auth.controller")
const { registerValidator, validateRequest, loginValidator } = require("../validators/auth.validator")
const authMiddleware = require("../middlewares/auth.middleware")

const authRoutes = express.Router()

authRoutes.post("/register",registerValidator, validateRequest, userRegisterController)
authRoutes.post("/login",loginValidator , validateRequest , userLoginController)
authRoutes.get("/me",authMiddleware ,userMeController)
authRoutes.post("/refresh",refreshTokenController)
authRoutes.post("/logout",userLogoutController)



module.exports = authRoutes