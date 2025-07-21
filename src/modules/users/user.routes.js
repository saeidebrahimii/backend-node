const { Router } = require("express");
const userController = require("./user.controller");

const router = Router();
router.put("/:id", userController.edit);

module.exports = { userRoutes: router };
