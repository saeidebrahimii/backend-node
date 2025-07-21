const { setCache } = require("../../services/redis.service");
const {
  hashPassword,
  compareHashPassword,
} = require("../../utils/password.util");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token.util");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("./auth.validation");
const config = require("config");

class AuthController {
  #service;
  constructor() {
    this.#service = require("../users/user.service");
  }
  async register(req, res, next) {
    try {
      const { error } = registerValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({
          errors: error.details.map((err) => err.message),
        });
      }

      const { firstName, lastName, email, mobile, password } = req.body;

      const existingUser = await this.#service.getByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await this.#service.create({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User registered successfully",
        data: {
          user: {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            mobile: newUser.mobile,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { error } = loginValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({
          errors: error.details.map((err) => err.message),
        });
      }
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const user = await this.#service.getByEmail(email);
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const isMatch = await compareHashPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const accessToken = generateAccessToken(
        { userId: user._id },
        config.get("accessToken.secretKey")
      );
      const refreshToken = generateRefreshToken(
        { userId: user._id },
        config.get("refreshToken.secretKey")
      );
      await setCache(`refreshToken:${refreshToken}`, refreshToken);

      return res.status(200).json({
        message: "Login successful",
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
