import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const Order = sequelize.define("Order", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
  orderDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  status: { type: DataTypes.ENUM("Pending", "Processing", "Completed", "Cancelled"), defaultValue: "Pending" },
  created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
}, {
  tableName: "orders",
  timestamps: false,
});

export default Order;
