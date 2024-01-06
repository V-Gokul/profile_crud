import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getImageUrl } from "../utils/image";
// import { generateCacheKey, getRedisClient } from "../utils/redis";

const prisma = new PrismaClient();

export class ProfileController {
  async createProfile(req: Request, res: Response) {
    console.log("req.body", req.body);
    const { name, email } = req.body;
    const image = req.file ? req.file.filename : "";
    try {
      if (!req.body.name || !req.body.email) {
        return res
          .status(400)
          .json({ error: "Missing required fields: name, email" });
      }
      const createdProfile = await prisma.profile.create({
        data: { name: name, email: email, image: image },
      });

      res.status(200).json({
        message: "profile created successfully",
        data: {
          ...createdProfile,
          image: getImageUrl(req, createdProfile.image ?? ""),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create profile" });
    }
  }

  async profiles(req: Request, res: Response) {
    try {
      const datas = await prisma.profile.findMany();
      const profilesWithImageUrl = datas.map((profile) => ({
        ...profile,
        image: getImageUrl(req, profile.image ?? ""),
      }));

      /*     // Get the Redis client instance first:
      const redisClient = await getRedisClient();

      await redisClient.set(
        generateCacheKey(req),
        JSON.stringify(profilesWithImageUrl),
        "EX",
        60
      ); // Cache for 60 seconds */

      res.status(200).json({
        message: "profile fetched successfully",
        data: [profilesWithImageUrl],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create profiles" });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const data = await prisma.profile.findUnique({
        where: { id: req.params.id },
      });

      if (!data) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const profileWithImageUrl = {
        ...data,
        image: getImageUrl(req, data.image ?? ""),
      };

      res.status(200).json({
        message: "profile fetched successfully",
        data: profileWithImageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  async updateProfile(req: Request, res: Response) {
    const { name, email, image } = req.body;
    try {
      const profile = await prisma.profile.findUnique({
        where: { id: req.params.id },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const data = await prisma.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          email: email,
          name: name,
          image: image,
        },
      });
      const profileWithImageUrl = {
        ...data,
        image: getImageUrl(req, data.image ?? ""),
      };
      res.status(200).json({
        message: "Profile updated successfully",
        data: profileWithImageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const profile = await prisma.profile.findUnique({
        where: { id: req.params.id },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const data = await prisma.profile.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: "Profile deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete profile" });
    }
  }
}
