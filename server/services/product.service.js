import { sequelize, Product, ProductImage, Brand, Category, ProductSize } from "../models/index.js";
import { PaginationService } from "./pagination.service.js";

export const ProductService = {
  // Lấy tất cả sản phẩm
  async getAll({ page = 1, limit = 10, search, status, categoryId, brandId, sort }) {
    const where = {};
    if (status) where.status = status;
    if (brandId) where.brand_id = parseInt(brandId);

    const include = [
      { model: Brand, as: "brand", attributes: ["id", "name"] },
      { model: ProductImage, as: "images", attributes: ["id", "url", "isDefault", "allText"] },
      { model: ProductSize, as: "sizes", attributes: ["id", "size" , "stock"] },
    ];

    if (categoryId) {
      include.push({
        model: Category,
        as: "categories",
        attributes: ["id", "name"],
        where: { id: parseInt(categoryId) },
        through: { attributes: [] },
      });
    } else {
      include.push({
        model: Category,
        as: "categories",
        attributes: ["id", "name"],
        through: { attributes: [] },
      });
    }

    let order = [["created_at", "DESC"]];
    if (sort) {
      switch (sort) {
        case "name_asc": order = [["name", "ASC"]]; break;
        case "name_desc": order = [["name", "DESC"]]; break;
        case "price_asc": order = [["price", "ASC"]]; break;
        case "price_desc": order = [["price", "DESC"]]; break;
      }
    }

    return PaginationService.paginate(Product, { 
      page, 
      limit, 
      where, 
      include, 
      search: search ? { key: "name", value: search } : null, 
      order 
    });
  },

  async getById(id) {
    return Product.findByPk(id, {
      include: [
        { model: Brand, as: "brand", attributes: ["id", "name", "slug"] },
        { model: Category, as: "categories", attributes: ["id", "name", "slug"], through: { attributes: [] } },
        { model: ProductImage, as: "images", attributes: ["id", "url", "isDefault", "allText"] },
        { model: ProductSize, as: "sizes", attributes: ["id", "size" , "stock"],},
      ],
    });
  },

  async getBySlug(slug) {
    return Product.findOne({
      where: { slug, status: "Active" },
      include: [
        { model: Brand, as: "brand", attributes: ["id", "name", "slug"] },
        { model: Category, as: "categories", attributes: ["id", "name", "slug"], through: { attributes: [] } },
        { model: ProductImage, as: "images", attributes: ["id", "url", "isDefault", "allText"] },
        { model: ProductSize, as: "sizes", attributes: ["id", "size", "stock"]},
      ],
    });
  },

async create(data, files) {
  const t = await sequelize.transaction();
  try {
    if (data.brand_id) data.brand_id = parseInt(data.brand_id);
    if (data.price) data.price = parseFloat(data.price);
    if (data.discountPrice) data.discountPrice = parseFloat(data.discountPrice);
    if (data.mainImageIndex) data.mainImageIndex = parseInt(data.mainImageIndex);

    if (data.categoryIds) {
      if (!Array.isArray(data.categoryIds)) data.categoryIds = [data.categoryIds];
      data.categoryIds = data.categoryIds.map(Number);
    }

    let sizesArray = [];
    if (data.sizes) {
      if (!Array.isArray(data.sizes)) {
        sizesArray = [JSON.parse(data.sizes)];
      } else {
        sizesArray = data.sizes.map(s => (typeof s === 'string' ? JSON.parse(s) : s));
      }
    }

    const product = await Product.create(data, { transaction: t });

    if (data.categoryIds && data.categoryIds.length > 0) {
      await product.setCategories(data.categoryIds, { transaction: t });
    }

    if (files && files.length > 0) {
      const mainIndex = data.mainImageIndex || 0;
      const images = files.map((f, index) => ({
        product_id: product.id,
        url: f.path || f.secure_url || f.location,
        isDefault: index === mainIndex,
      }));
      await ProductImage.bulkCreate(images, { transaction: t });
    }

    if (sizesArray.length > 0) {
      const sizeRecords = sizesArray.map(s => ({
        product_id: product.id,
        size: s.size,
        stock: s.stock,
      }));
      await ProductSize.bulkCreate(sizeRecords, { transaction: t });
    }
    await t.commit();

   const fullProduct = await ProductService.getById(product.id);
    return fullProduct;
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error("Create product error:", err);
    throw err;
  }
},

async update(id, data, files) {
  const t = await sequelize.transaction();
  try {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    if (data.brand_id) data.brand_id = parseInt(data.brand_id);
    if (data.price) data.price = parseFloat(data.price);
    if (data.discountPrice) data.discountPrice = parseFloat(data.discountPrice);
    if (data.mainImageIndex) data.mainImageIndex = parseInt(data.mainImageIndex);

    // categoryIds
    if (data.categoryIds) {
      if (!Array.isArray(data.categoryIds)) data.categoryIds = [data.categoryIds];
      data.categoryIds = data.categoryIds.map(Number);
    }

    // sizes
    let sizesArray = [];
    if (data.sizes) {
      if (!Array.isArray(data.sizes)) {
        sizesArray = [JSON.parse(data.sizes)];
      } else {
        sizesArray = data.sizes.map(s => (typeof s === 'string' ? JSON.parse(s) : s));
      }
    }
    await product.update(data, { transaction: t });
    if (data.categoryIds) {
      await product.setCategories(data.categoryIds, { transaction: t });
    }

    if (files && files.length > 0) {
      const mainIndex = data.mainImageIndex || 0;
      const images = files.map((f, index) => ({
        product_id: product.id,
        url: f.path || f.secure_url || f.location,
        isDefault: index === mainIndex,
      }));
      await ProductImage.bulkCreate(images, { transaction: t });
    }

    if (sizesArray.length > 0) {
      await ProductSize.destroy({ where: { product_id: product.id }, transaction: t });
      const sizeRecords = sizesArray.map(s => ({
        product_id: product.id,
        size: s.size,
        stock: s.stock,
      }));
      await ProductSize.bulkCreate(sizeRecords, { transaction: t });
    }
    await t.commit();
 
  const fullProduct = await ProductService.getById(product.id);
  return fullProduct;
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error("Update product error:", err);
    throw err;
  }
},


  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return false;

    await ProductImage.destroy({ where: { product_id: id } });
    const deleted = await Product.destroy({ where: { id } });
    return deleted > 0;
  },
};
