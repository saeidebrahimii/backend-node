const { verifyJWT } = require("../../utils/token.util");
const config = require("config");

async function authGuard(req, res, next) {
  const authHeader = req.headers?.["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyJWT(token, config.get("accessToken.secretKey"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authGuard };
