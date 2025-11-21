import { sequelize } from "../config/connect.js";

// Import models
import Product from "./product.model.js";
import ProductImage from "./product_image.model.js";
import Brand from "./brand.model.js";
import Category from "./category.model.js";
import ProductCategory from "./product_category.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import OrderDetail from "./order_detail.model.js";
import Review from "./review.model.js";
import Promotion from "./promotion.model.js";
import Invoice from "./invoice.model.js";
import ShippingCost from "./shippingcost.model.js";
import WarehouseHistory from "./warehouse_history.model.js";
import Admin from "./admin.model.js";
// ------------------ RELATIONSHIPS ------------------

// Brand - Product (1-N)
Brand.hasMany(Product, { foreignKey: "brand_id", as: "products" });
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

// Product - ProductImage (1-N)
Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Product - Category (N-N)
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  as: "categories",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  as: "products",
});

// ... các quan hệ còn lại giữ nguyên
// User - Order (1-N)
User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Order - OrderDetail (1-N)
Order.hasMany(OrderDetail, { foreignKey: "order_id", as: "details" });
OrderDetail.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// Product - OrderDetail (1-N)
Product.hasMany(OrderDetail, { foreignKey: "product_id", as: "orderDetails" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// User - Review (1-N)
User.hasMany(Review, { foreignKey: "user_id", as: "reviews" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Product - Review (1-N)
Product.hasMany(Review, { foreignKey: "product_id", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Promotion - Product (N-N)
Promotion.belongsToMany(Product, {
  through: "promotion_product",
  foreignKey: "promotion_id",
  as: "products",
});
Product.belongsToMany(Promotion, {
  through: "promotion_product",
  foreignKey: "product_id",
  as: "promotions",
});

// Promotion - User (N-N)
Promotion.belongsToMany(User, { through: "promotion_user", foreignKey: "promotion_id", as: "users" });
User.belongsToMany(Promotion, { through: "promotion_user", foreignKey: "user_id", as: "promotions" });

// Order - Invoice (1-1)
Invoice.belongsTo(Order, { foreignKey: "order_id", as: "order" });
Order.hasOne(Invoice, { foreignKey: "order_id", as: "invoice" });

// Order - ShippingCost (1-N)
Order.belongsTo(ShippingCost, { foreignKey: "shipping_cost_id", as: "shippingCost" });
ShippingCost.hasMany(Order, { foreignKey: "shipping_cost_id", as: "orders" });


// Product - WarehouseHistory (1-N)
Product.hasMany(WarehouseHistory, { foreignKey: "product_id", as: "warehouseHistories" });
WarehouseHistory.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Admin - WarehouseHistory (1-N)
Admin.hasMany(WarehouseHistory, { foreignKey: "admin_id", as: "warehouseHistories" });
WarehouseHistory.belongsTo(Admin, { foreignKey: "admin_id", as: "admin" });


export {
  sequelize,
  Admin,
  Product,
  ProductImage,
  Brand,
  Category,
  ProductCategory,
  User,
  Order,
  OrderDetail,
  Review,
  Promotion,
  Invoice,
  ShippingCost,
  WarehouseHistory,
};
