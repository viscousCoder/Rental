import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import cloudinary from "../config/cloudinary";

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    const fileFormat = file.mimetype.split("/")[1];
    const allowedFormats = ["jpeg", "png", "jpg", "gif"];

    if (allowedFormats.includes(fileFormat)) {
      return {
        folder: "rental",
        format: fileFormat,
        resource_type: "image",
      };
    }

    throw new Error("Only image files (JPEG, PNG, JPG, GIF) are allowed");
  },
});

// File filter to accept only images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimetypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
  ];

  if (!allowedMimetypes.includes(file.mimetype)) {
    return cb(new Error("Only image files (JPEG, PNG, JPG, GIF) are allowed"));
  }
  cb(null, true);
};

// Initialize Multer with the Cloudinary storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export default upload;
