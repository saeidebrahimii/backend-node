module.exports = {
  server: {
    port: process.env.PORT,
    db: {
      mongoDb: {
        url: process.env.MONGODB_URL,
      },
    },
  },
};
