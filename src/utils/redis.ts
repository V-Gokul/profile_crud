/* import { Redis } from "ioredis";

let redisClient: Redis | null = null;

export const getRedisClient = async () => {
  try {
    if (!redisClient) {
      redisClient = new Redis(); // Create a new Redis client instance

      await new Promise((resolve, reject) => {
        redisClient.on("connect", () => {
          console.log("Connected to Redis");
          resolve();
        });
        redisClient.on("error", (err) => {
          console.error("Redis Client Error", err);
          reject(err);
        });
      });
    }
    return redisClient;
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error; // Rethrow for further handling
  }
};

export function generateCacheKey(req: Request): string {
  // Implement logic to create a unique cache key based on request parameters
  return `${req.method}:${req.url}`; // Example using method and URL
}
 */
