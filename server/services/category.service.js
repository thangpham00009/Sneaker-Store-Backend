import Category from "../models/category.model.js";

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
  async create(data) {
    return await Category.create(data);
  },

  // Cập nhật category
  async update(id, data) {
    const [updated] = await Category.update(data, { where: { id } });
    if (!updated) return null;
    return await Category.findByPk(id);
  },

  // Xóa category
  async delete(id) {
    const deleted = await Category.destroy({ where: { id } });
    return deleted > 0;
  }
};
