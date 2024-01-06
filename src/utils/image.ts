/* import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb) {
    const uploadPath = path.join(__dirname, "public", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

export const upload = multer({ storage: storage });
export const getImageUrl = (filename: string) =>
  `http://localhost:3000/uploads/${filename}`;
 */

import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const prisma = new PrismaClient();

// Multer configuration with robust error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public", "uploads");

    fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if needed

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Prevent potential path traversal attacks
    const sanitizedFilename = path.basename(file.originalname);
    const uniqueFilename = `${uuidv4()}-${sanitizedFilename}`;
    cb(null, uniqueFilename);
  },
});

export const upload = multer({ storage });

// Function to construct image URLs with better portability
export const getImageUrl = (req: Request, filename?: string) => {
  const protocol = req.protocol || "http";
  const hostname = req.get("host");
  return `${protocol}://${hostname}/uploads/${filename}`;
};
