const mongoose = require("mongoose");
const config = require("config");
mongoose
  .connect(config.get("server.db.mongoDb.url"))
  .then(() => {
    console.log(`✅ Successfully connected to database`);
  })
  .catch((error) => {
    console.log("DB ERROR: ", error);
  });
