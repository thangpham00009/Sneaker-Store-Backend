import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/connect.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM("Admin", "User"), allowNull: false, defaultValue: "User" },
  created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: Sequelize.NOW },
}, {
  tableName: "users",
  timestamps: false,
});

export default User;
