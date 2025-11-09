import Product from "../models/product.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.service.js";

export const getAllProductsService = async () => {
  try {
    const products = await Product.findAll({
      order: [["created_at", "DESC"]],
    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductByIdService = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

export const createProductService = async (productData, imageFiles) => {
  try {
    const imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUrl = await uploadToCloudinary(file, "Products");
        imageUrls.push(imageUrl);
      }
      productData.images = imageUrls;
    }
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductService = async (id, productData, imageFiles) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (imageFiles && imageFiles.length > 0) {
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
          await deleteFromCloudinary(imageUrl);
        }
      }

      const imageUrls = [];
      for (const file of imageFiles) {
        const imageUrl = await uploadToCloudinary(file, "Products");
        imageUrls.push(imageUrl);
      }
      productData.images = imageUrls;
    }

    await product.update(productData);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductService = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        await deleteFromCloudinary(imageUrl);
      }
    }

    await product.destroy();
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
