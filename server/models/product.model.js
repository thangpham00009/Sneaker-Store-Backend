import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
    },
    stockQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "brands", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);

export default Product;
