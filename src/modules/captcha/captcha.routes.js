const { Router } = require("express");
const captchaController = require("./captcha.controller");

const router = Router();
router.get("/", captchaController.get);

module.exports = { captchaRoutes: router };
