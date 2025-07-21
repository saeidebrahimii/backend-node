const { default: autoBind } = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const { hashPassword } = require("../../utils/password.util");
const { editUserValidationSchema } = require("./user.validation");

class UserController {
  #service;
  constructor() {
    this.#service = require("./user.service");
    autoBind(this);
  }
  async edit(req, res, next) {
    try {
      const result = editUserValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (result.error) {
        return res.status(400).json({
          errors: result.error.details.map((err) => err.message),
        });
      }
      const { id: userId } = req.params;
      if (isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      const { firstName, lastName, email, password, mobile } = req.body;
      const updates = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(mobile && { mobile }),
        ...(email && { email }),
        ...(password && { password: await hashPassword(password) }),
      };
      const user = await this.#service.update(userId, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
