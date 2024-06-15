import Redis from "ioredis";

export const redisServer = new Redis(process.env.REDIS_URL_SERVER || "");

// We might need separate client for proxy server
