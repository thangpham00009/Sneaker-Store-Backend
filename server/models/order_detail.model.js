import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const OrderDetail = sequelize.define("OrderDetail", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
}, {
  tableName: "order_details",
  timestamps: false,
});

export default OrderDetail;
