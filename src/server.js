const app = require("./app");
const config = require("config");

app.listen(config.get("server.port"), () => {
  console.log(`🚀 Application run on port ${config.get("server.port")}`);
});
