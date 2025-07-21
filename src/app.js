if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
} else {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const { userRoutes } = require("./modules/users/user.routes");
const { authRoutes } = require("./modules/auth/auth.routes");
const app = express();
require("./config/db/mongoose");
app.use(morgan("dev"));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use((req, res) => {
  return res.status(404).json({ message: "route not found." });
});
app.use(errorHandler);
module.exports = app;
