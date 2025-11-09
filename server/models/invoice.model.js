import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const Invoice = sequelize.define("Invoice", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
  invoiceDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
  tableName: "invoices",
  timestamps: false,
});

export default Invoice;
