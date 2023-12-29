import express from "express";
import { ProfileController } from "../controller/profile.controller";
import { upload } from "../utils/image";

const profileRouter = express.Router();

const profileController = new ProfileController();

profileRouter.post(
  "/",
  upload.single("image"),
  profileController.createProfile
);
profileRouter.get("/", profileController.profiles);
profileRouter.get("/:id", profileController.profile);
profileRouter.put("/:id", profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);

export default profileRouter;
