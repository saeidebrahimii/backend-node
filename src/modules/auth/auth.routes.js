const { Router } = require("express");
const authController = require("./auth.controller");

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = { authRoutes: router };
