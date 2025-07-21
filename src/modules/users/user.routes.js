const { Router } = require("express");
const userController = require("./user.controller");
const { authGuard } = require("../../middlewares/guard/auth.guard");

const router = Router();
router.put("/:id", authGuard, userController.edit);

module.exports = { userRoutes: router };
