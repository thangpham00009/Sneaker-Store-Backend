import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";
import Cart from "./cart.model.js";
import Product from "./product.model.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    cart_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "carts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    tableName: "cart_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default CartItem;
