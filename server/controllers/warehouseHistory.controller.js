import { WarehouseHistoryService } from "../services/warehouseHistory.service.js";

// Lấy tất cả lịch sử kho với pagination + filter
export const getAllWarehouseHistories = async (req, res) => {
  try {
    const { page, limit, productId, searchKey, searchValue } = req.query;

    const result = await WarehouseHistoryService.getAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      productId,
      searchKey,
      searchValue,
    });

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy lịch sử kho theo ID
export const getWarehouseHistoryById = async (req, res) => {
  try {
    const history = await WarehouseHistoryService.getById(req.params.id);
    if (!history)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tạo mới lịch sử kho (chỉ admin)
export const createWarehouseHistory = async (req, res) => {
  try {
    const { product_id, change_quantity } = req.body;

    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const admin_id = req.admin.id;

    const history = await WarehouseHistoryService.create({
      product_id,
      change_quantity,
      admin_id,
    });

    res.status(201).json({ success: true, data: history });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cập nhật lịch sử kho (chỉ admin)
export const updateWarehouseHistory = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updated = await WarehouseHistoryService.update(
      req.params.id,
      req.body
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Xóa lịch sử kho (chỉ admin)
export const deleteWarehouseHistory = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const deleted = await WarehouseHistoryService.delete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
