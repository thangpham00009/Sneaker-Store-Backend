import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamicUpload = (baseFolder, fieldName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const folderName =
        req.body && req.body.name
          ? req.body.name.trim().replace(/\s+/g, "_")
          : "default";

      return {
        folder: `PERN_SNEAKER/${baseFolder}/${folderName}`,
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
        use_filename: true,
        unique_filename: true,
      };
    },
  });

  return multer({ storage }).single(fieldName);
};

export const uploadCategory = dynamicUpload("Categories", "image");
export const uploadBrand = dynamicUpload("Brands", "image");
export const uploadProduct = dynamicUpload("Products", "image");
export const uploadPromotion = dynamicUpload("Promotions", "image");

export const uploadProductImages = (req, res, next) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "PERN_SNEAKER/Products",
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(new Error("Not an image! Please upload only images."), false);
    },
  }).array("images", 10);

  upload(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};
