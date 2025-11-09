import Brand from "../models/brand.model.js";

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

export const createBrandService = async (brandData) => {
  try {
    const brand = await Brand.create(brandData);
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBrandService = async (id, brandData) => {
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
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
    await brand.destroy();
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
