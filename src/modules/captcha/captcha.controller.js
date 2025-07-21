const { v4: uuidv4 } = require("uuid");
const { generateCaptcha } = require("../../utils/captcha.util");
const { setCache, getCache } = require("../../services/redis.service");

class CaptchaController {
  async get(req, res, next) {
    const captcha = generateCaptcha();
    const id = uuidv4();
    await setCache(`captcha:${id}`, { captcha }, 2 * 60);
    return res.json({ captcha, id });
  }
}
module.exports = new CaptchaController();
