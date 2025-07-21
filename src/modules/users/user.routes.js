const { Router } = require("express");
const userController = require("./user.controller");
const { authGuard } = require("../../middlewares/guard/auth.guard");
const validate = require("../../middlewares/validate");
const { editUserValidationSchema } = require("./user.validation");
const { captchaGuard } = require("../../middlewares/guard/captcha.guard");

const router = Router();
router.put(
  "/",
  validate(editUserValidationSchema),
  authGuard,
  captchaGuard,
  userController.edit
);

module.exports = { userRoutes: router };
