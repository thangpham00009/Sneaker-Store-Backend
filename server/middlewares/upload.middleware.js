import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `PERN_SNEAKER/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    },
  });
};

export const uploadCategory = multer({ storage: createStorage("Categories") });
export const uploadBrand = multer({ storage: createStorage("Brands") });
export const uploadProduct = multer({ storage: createStorage("Products") });
export const uploadPromotion = multer({ storage: createStorage("Promotions") });

export const uploadProductImages = multer({
  storage: createStorage("Products"),
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."), false);
    }
  },
}).array("images", 10); 
