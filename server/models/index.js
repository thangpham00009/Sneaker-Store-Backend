import { sequelize } from "../config/connect.js";

// Import các model
import Product from "./product.model.js";
import Brand from "./brand.model.js";
import Category from "./category.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import OrderDetail from "./order_detail.model.js";
import News from "./news.model.js";
import Admin from "./admin.model.js";
import Review from "./review.model.js";
import Promotion from "./promotion.model.js";
import Invoice from "./invoice.model.js";
import ShippingCost from "./shippingcost.model.js";

// Brand - Product (1-N)
Brand.hasMany(Product, { foreignKey: { name: "brand_id", allowNull: false }, as: "products" });
Product.belongsTo(Brand, { foreignKey: { name: "brand_id", allowNull: false }, as: "brand" });

// Category - Product (1-N)
Category.hasMany(Product, { foreignKey: { name: "category_id", allowNull: false }, as: "products" });
Product.belongsTo(Category, { foreignKey: { name: "category_id", allowNull: false }, as: "category" });

// User - Order (1-N)
User.hasMany(Order, { foreignKey: { name: "user_id", allowNull: false }, as: "orders" });
Order.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false }, as: "user" });

// Order - OrderDetail (1-N)
Order.hasMany(OrderDetail, { foreignKey: { name: "order_id", allowNull: false }, as: "details" });
OrderDetail.belongsTo(Order, { foreignKey: { name: "order_id", allowNull: false }, as: "order" });

// Product - OrderDetail (1-N)
Product.hasMany(OrderDetail, { foreignKey: { name: "product_id", allowNull: false }, as: "orderDetails" });
OrderDetail.belongsTo(Product, { foreignKey: { name: "product_id", allowNull: false }, as: "product" });

// User - Review (1-N)
User.hasMany(Review, { foreignKey: { name: "user_id", allowNull: false }, as: "reviews" });
Review.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false }, as: "user" });

// Product - Review (1-N)
Product.hasMany(Review, { foreignKey: { name: "product_id", allowNull: false }, as: "reviews" });
Review.belongsTo(Product, { foreignKey: { name: "product_id", allowNull: false }, as: "product" });

// Promotion - Product (N-N)
Promotion.belongsToMany(Product, { through: "promotion_product", foreignKey: "promotion_id", as: "products" });
Product.belongsToMany(Promotion, { through: "promotion_product", foreignKey: "product_id", as: "promotions" });

// Promotion - User (N-N)
Promotion.belongsToMany(User, { through: "promotion_user", foreignKey: "promotion_id", as: "users" });
User.belongsToMany(Promotion, { through: "promotion_user", foreignKey: "user_id", as: "promotions" });

// Order - Invoice (1-1)
Invoice.belongsTo(Order, { foreignKey: { name: "order_id", allowNull: false }, as: "order" });
Order.hasOne(Invoice, { foreignKey: { name: "order_id", allowNull: false }, as: "invoice" });

// Order - ShippingCost (1-N)
Order.belongsTo(ShippingCost, { foreignKey: { name: "shipping_cost_id", allowNull: true }, as: "shippingCost" });
ShippingCost.hasMany(Order, { foreignKey: { name: "shipping_cost_id", allowNull: true }, as: "orders" });

export {
  sequelize,
  Product,
  Brand,
  Category,
  User,
  Order,
  OrderDetail,
  News,
  Admin,
  Review,
  Promotion,
  Invoice,
  ShippingCost,
};
