import Category from "../models/category.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.service.js";
import { PaginationService } from "./pagination.service.js";

export const CategoryService = {
 async getAll({ page = 1, limit = 10, search, status }) {
    const where = {};
    if (status) where.status = status;

    return await PaginationService.paginate(Category, {
      page,
      limit,
      where,
      search: search ? { key: "name", value: search } : null,
      order: [["created_at", "DESC"]],
    });
  },

  // Lấy category theo slug
  async getBySlug(slug) {
    return await Category.findOne({ where: { slug, status: "Active" } });
  },

  //Lấy theo id
  async getById(id) {
    return await Category.findByPk(id);
  },
 async create(data, file) {
    try {
      if (file) data.image = file.path; 
      return await Category.create(data);
    } catch (error) {
      console.error("CategoryService.create error:", error);
      throw error;
    }
  },

  async update(id, data, file) {
    try {
      const category = await Category.findByPk(id);
      if (!category) return null;

      if (file) {
        if (category.image) await deleteFromCloudinary(category.image);
        data.image = file.path;
      }

      const [updated] = await Category.update(data, { where: { id } });
      if (!updated) return null;
      return await Category.findByPk(id);
    } catch (error) {
      console.error("CategoryService.update error:", error);
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
   async getProducts(categoryId) {
    return await Product.findAll({
      where: { category_id: categoryId },
      order: [["created_at", "DESC"]],
    });
  },
};
