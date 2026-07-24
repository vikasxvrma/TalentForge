import config from "./index.js";
console.log("Redis URL:", config.queue.redisUrl);

const redisConnection = {
  connection: {
    url: config.queue.redisUrl,
  },
};

export default redisConnection;