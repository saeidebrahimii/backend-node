const { createClient } = require("redis");
const config = require("config");

const redisClient = createClient({
  url: config.get("server.db.redis.url"),
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

let isConnected = false;
async function connectRedis() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
}

const DEFAULT_EXPIRETION = 60 * 60;

async function getOrSetCache(key, cb) {
  await connectRedis();
  const data = await redisClient.get(key);
  if (data != null) {
    return JSON.parse(data);
  }

  const freshData = await cb();
  await redisClient.setEx(key, DEFAULT_EXPIRETION, JSON.stringify(freshData));
  return freshData;
}
async function deleteCache(key) {
  await connectRedis();
  return await redisClient.del(key);
}
async function setCache(key, value, expireIn = DEFAULT_EXPIRETION) {
  await connectRedis();
  return await redisClient.setEx(key, expireIn, JSON.stringify(value));
}
async function getCache(key) {
  await connectRedis();
  const cache = await redisClient.get(key);
  return JSON.parse(cache);
}

module.exports = { getOrSetCache, deleteCache, setCache, getCache };
