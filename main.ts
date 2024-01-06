import express, { Request, Response } from "express"; // Explicit types for clarity
import profileRouter from "./src/routes/profile.route";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import { generateCacheKey, getRedisClient } from "./src/utils/redis";

/* const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const redis = await getRedisClient();
  const key = generateCacheKey(req); // Function to create cache key
  const cachedData = await redis.get(key);
  console.log("key", key, "cachedData", cachedData);
  if (cachedData) {
    res.json(JSON.parse(cachedData));
  } else {
    next(); // Continue to the controller if not cached
  }
}; */

const app = express();
const PORT = 3000;

// app.use(cacheMiddleware); // Apply cache middleware globally
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(helmet()); // Apply core helmet protection
// Configure rate limit middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 100 requests per window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "src", "utils", "public", "uploads"))
); // Serve static files from the uploads directory

app.use("/profile", profileRouter); // Mount the profile router

// Error handling middleware (optional, but recommended)
app.use((err: any, req: Request, res: Response, next: () => void) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
