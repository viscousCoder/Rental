import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.fields([
  { name: "images", maxCount: 10 }, // Multiple files
]);

export { uploadMiddleware };
