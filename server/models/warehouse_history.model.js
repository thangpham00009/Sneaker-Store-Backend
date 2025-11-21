import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const WarehouseHistory = sequelize.define(
  "WarehouseHistory",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "admins", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    old_quantity: { type: DataTypes.INTEGER, allowNull: false },
    new_quantity: { type: DataTypes.INTEGER, allowNull: false },
    change_quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "warehouse_histories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default WarehouseHistory;
