import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT },
    images: { type: DataTypes.ARRAY(DataTypes.STRING(500)), defaultValue: [] },
    stockQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

export default Product;
