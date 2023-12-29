import { PrismaClient } from "@prisma/client";
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
