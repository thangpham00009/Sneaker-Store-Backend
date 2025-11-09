import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `PERN_SNEAKER/${folder}`,
      use_filename: true,
      unique_filename: true,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicUrl) => {
  try {
    if (!publicUrl) return;

    const publicId = publicUrl.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(`PERN_SNEAKER/${publicId}`);
  } catch (error) {
    throw new Error(`Error deleting from Cloudinary: ${error.message}`);
  }
};
