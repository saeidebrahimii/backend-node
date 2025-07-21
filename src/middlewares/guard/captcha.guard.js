const { getCache, deleteCache } = require("../../services/redis.service");

async function captchaGuard(req, res, next) {
  try {
    const { id, captcha } = req.body || {};
    if (id && captcha) {
      const findCaptcha = await getCache(`captcha:${id}`);
      if (!findCaptcha || findCaptcha?.captcha !== captcha) {
        return res.status(400).json({
          message: "The CAPTCHA you entered is incorrect. Please try again.",
        });
      }
      await deleteCache(`captcha:${id}`);
      next();
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the captcha code." });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { captchaGuard };
