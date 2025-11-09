import Category from "../models/category.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.service.js";

export const CategoryService = {
  // Lấy tất cả category đang active
  async getAll() {
    return await Category.findAll({ where: { status: "Active" } });
  },

  // Lấy category theo slug
  async getBySlug(slug) {
    return await Category.findOne({ where: { slug, status: "Active" } });
  },

  // Tạo mới category
  async create(data, imageFile) {
    try {
      if (imageFile) {
        const imageUrl = await uploadToCloudinary(imageFile, "Categories");
        data.image = imageUrl;
      }
      return await Category.create(data);
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật category
  async update(id, data, imageFile) {
    try {
      const category = await Category.findByPk(id);
      if (!category) return null;

      if (imageFile) {
        if (category.image) {
          await deleteFromCloudinary(category.image);
        }
        const imageUrl = await uploadToCloudinary(imageFile, "Categories");
        data.image = imageUrl;
      }

      const [updated] = await Category.update(data, { where: { id } });
      if (!updated) return null;
      return await Category.findByPk(id);
    } catch (error) {
      throw error;
    }
  },

  // Xóa category
  async delete(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) return false;
      if (category.image) {
        await deleteFromCloudinary(category.image);
      }

      const deleted = await Category.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw error;
    }
  },
};
