import {
  getAllBrandsService,
  getBrandBySlugService,
  createBrandService,
  updateBrandService,
  deleteBrandService,
} from "../services/brand.service.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await getAllBrandsService();
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getBrandBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const brand = await getBrandBySlugService(slug);
    if (!brand) {
      return res.status(404).json({
        status: "error",
        message: "Brand not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    if (req.file) {
      brandData.image = req.file.path;
    }
    const brand = await createBrandService(brandData);
    res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brandData = req.body;
    const brand = await updateBrandService(id, brandData);
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBrandService(id);
    res.status(200).json({
      status: "success",
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
