const { Router } = require("express");
const userController = require("./user.controller");
const { authGuard } = require("../../middlewares/guard/auth.guard");
const validate = require("../../middlewares/validate");
const { editUserValidationSchema } = require("./user.validation");

const router = Router();
router.put(
  "/",
  authGuard,
  validate(editUserValidationSchema),
  userController.edit
);

module.exports = { userRoutes: router };
