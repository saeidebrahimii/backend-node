if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
} else {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const { setCache } = require("./services/redis.service");
const app = express();
require("./config/db/mongoose");
app.use(morgan("dev"));
setCache("tes", "test");

app.use((req, res) => {
  return res.status(404).json({ message: "route not found." });
});
app.use(errorHandler);
module.exports = app;
