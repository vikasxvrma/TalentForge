import config from "./index.js";

const redisConnection = {
  connection: {
    url: config.queue.redisUrl,
  },
};

export default redisConnection;