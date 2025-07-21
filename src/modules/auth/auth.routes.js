const { Router } = require("express");
const authController = require("./auth.controller");
const validate = require("../../middlewares/validate");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("./auth.validation");

const router = Router();
router.post(
  "/register",
  validate(registerValidationSchema),
  authController.register
);
router.post("/login", validate(loginValidationSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = { authRoutes: router };
