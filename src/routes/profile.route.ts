import express from "express";
import { Request, Response } from "express"; // Explicit types for clarity
import { ProfileController } from "../controller/profile.controller";
import { upload } from "../utils/image";
import rateLimit from "express-rate-limit";

const profileRouter = express.Router();

const profileController = new ProfileController();

// Error handling middleware (optional, but recommended)
profileRouter.use((err: any, req: Request, res: Response, next: () => void) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const profileLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 5 requests per window for profile routes
  message: "Too many profile requests, please try again later.",
});

profileRouter.use(profileLimiter);

profileRouter.post(
  "/",
  upload.single("image"), // Handle image uploads
  profileController.createProfile
);
profileRouter.get("/", profileController.profiles);
profileRouter.get("/:id", profileController.profile);
profileRouter.put("/:id", profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);

export default profileRouter;
