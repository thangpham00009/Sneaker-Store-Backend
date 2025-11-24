import { WarehouseHistory, Product, Admin } from "../models/index.js";
import { PaginationService } from "./pagination.service.js";

export class WarehouseHistoryService {
  // Lấy tất cả với pagination + filter
static async getAll({
  page = 1,
  limit = 10,
  productId,
  searchKey,
  searchValue,
}) {
  const where = {};
  if (productId) where.product_id = productId;

  const options = {
    page,
    limit,
    where,
    search:
      searchKey && searchValue
        ? { key: searchKey, value: searchValue }
        : null,
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Product, // import Product model
        as: "product",
        attributes: ["id", "name"], // chọn fields cần thiết
      },
      {
        model: Admin, 
        as: "admin",
        attributes: ["id", "username"],
      },
    ],
  };

  return await PaginationService.paginate(WarehouseHistory, options);
}


  // Lấy theo ID
  static async getById(id) {
    return await WarehouseHistory.findByPk(id);
  }

  // Tạo mới (admin_id lấy từ req.user.id)
  static async create({ product_id, change_quantity, admin_id }) {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Product not found");

    const old_quantity = product.stockQuantity;
    const new_quantity = old_quantity + change_quantity;
    await product.update({ stockQuantity: new_quantity });

    // Tạo lịch sử kho
    const history = await WarehouseHistory.create({
      product_id,
      admin_id,
      old_quantity,
      new_quantity,
      change_quantity,
    });

    return history;
  }

  // Cập nhật (admin only)
  static async update(id, data) {
    const history = await WarehouseHistory.findByPk(id);
    if (!history) throw new Error("Warehouse history not found");

    await history.update(data);
    return history;
  }

  // Xóa (admin only)
  static async delete(id) {
    const history = await WarehouseHistory.findByPk(id);
    if (!history) throw new Error("Warehouse history not found");

    await history.destroy();
    return true;
  }
}
