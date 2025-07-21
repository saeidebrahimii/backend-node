const { v4: uuidv4 } = require("uuid");
const { generateCaptcha } = require("../../utils/captcha.util");
const { setCache, getCache } = require("../../services/redis.service");

class CaptchaController {
  async get(req, res, next) {
    const EXPIRE_CAPTCHA = 2 * 60; //2 minutes
    const captcha = generateCaptcha();
    const id = uuidv4();
    await setCache(`captcha:${id}`, { captcha }, EXPIRE_CAPTCHA);
    return res.json({ captcha, id });
  }
}
module.exports = new CaptchaController();
