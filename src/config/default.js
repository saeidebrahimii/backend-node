module.exports = {
  server: {
    port: process.env.PORT,
    db: {
      mongoDb: {
        url: process.env.MONGODB_URL,
      },
    },
  },
  accessToken: {
    secretKey: process.env.SECRET_TOKEN_ACCESS_KEY,
  },
  refreshToken: {
    secretKey: process.env.SECRET_TOKEN_REFRESH_KEY,
  },
};
