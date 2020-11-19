export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cacheTtl: process.env.CACHE_TTL,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
    password: process.env.REDIS_PASSWORD,
    prefix: process.env.REDIS_PREFIX,
  },
});
