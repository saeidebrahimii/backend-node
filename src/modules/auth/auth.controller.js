const { setCache, getCache } = require("../../services/redis.service");
const { default: autoBind } = require("auto-bind");
const {
  hashPassword,
  compareHashPassword,
} = require("../../utils/password.util");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyJWT,
} = require("../../utils/token.util");
const config = require("config");

class AuthController {
  #service;
  constructor() {
    this.#service = require("../users/user.service");
    autoBind(this);
  }
  async register(req, res, next) {
    try {
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
      const { email, password } = req.body;

      const user = await this.#service.getByEmail(email);

      const isMatch = await compareHashPassword(password, user?.password ?? "");
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
      await setCache(
        `refreshToken:${refreshToken}`,
        refreshToken,
        7 * 24 * 60 * 60
      );

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
  async refreshToken(req, res, next) {
    try {
      const { token: refreshTokenFromClient } = req.body;
      const cachedToken = await getCache(
        `refreshToken:${refreshTokenFromClient}`
      );
      if (!cachedToken) {
        return res.status(403).json({ message: "Token does not exist" });
      }
      try {
        const decoded = await verifyJWT(
          refreshTokenFromClient,
          config.get("refreshToken.secretKey")
        );
        const accessToken = await generateAccessToken(
          decoded,
          config.get("accessToken.secretKey")
        );
        return res.json({ accessToken });
      } catch (error) {
        return res.status(403).json({ message: "Refresh token has expired" });
      }
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { token } = req.body;
      await deleteCache(`refreshToken:${token}`);
      return res.json({ message: "logout successfully" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
