import Brand from "../models/brand.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.service.js";

export const getAllBrandsService = async () => {
  try {
    const brands = await Brand.findAll({
      order: [["created_at", "DESC"]],
    });
    return brands;
  } catch (error) {
    throw new Error(error);
  }
};

export const getBrandBySlugService = async (slug) => {
  try {
    const brand = await Brand.findOne({
      where: { slug },
    });
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

export const createBrandService = async (brandData, imageFile) => {
  try {
    if (imageFile) {
      const imageUrl = await uploadToCloudinary(imageFile, "Brands");
      brandData.image = imageUrl;
    }
    const brand = await Brand.create(brandData);
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBrandService = async (id, brandData, imageFile) => {
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }

    if (imageFile) {
      if (brand.image) {
        await deleteFromCloudinary(brand.image);
      }
      const imageUrl = await uploadToCloudinary(imageFile, "Brands");
      brandData.image = imageUrl;
    }

    await brand.update(brandData);
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBrandService = async (id) => {
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    if (brand.image) {
      await deleteFromCloudinary(brand.image);
    }

    await brand.destroy();
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
