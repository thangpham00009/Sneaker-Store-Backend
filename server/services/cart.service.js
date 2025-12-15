import { Cart, CartItem, Product, ProductImage } from "../models/index.js";

class CartService {
  // Lấy cart của user
async getUserCart(userId) {
  let cart = await Cart.findOne({
    where: { user_id: userId },
    include: [
      {
        model: CartItem,
        as: "items",
        include: [
          {
            model: Product,
            as: "product",  
            include: [
              {
                model: ProductImage,
                as: "images", 
              },
            ],
          },
        ],
      },
    ],
  });

  if (!cart) {
    cart = await Cart.create({ user_id: userId });
  }

  return cart;
}

  // Thêm sản phẩm vào cart
  async addItem(userId, productId, quantity = 1, size) {
    const cart = await this.getUserCart(userId);

    // Tìm theo product_id **và size**
    let item = await CartItem.findOne({
      where: {
      cart_id: cart.id,
      product_id: Number(productId),
      size: String(size),
    },
    });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        size, // thêm size
      });
    }

    return item;
  }


  // Cập nhật số lượng sản phẩm
async updateItem(userId, productId, quantity, size) {
  const cart = await this.getUserCart(userId);

  const item = await CartItem.findOne({
    where: {
      cart_id: cart.id,
      product_id: productId,
      size,
    },
  });

  if (!item) throw new Error("Item not found in cart");

  item.quantity = quantity;
  await item.save();
  return item;
}


  // Xóa sản phẩm khỏi cart
async removeItem(userId, productId, size) {
  const cart = await this.getUserCart(userId);

  const item = await CartItem.findOne({
    where: {
      cart_id: cart.id,
      product_id: productId,
      size,
    },
  });

  if (!item) throw new Error("Item not found in cart");

  await item.destroy();
  return true;
}


  // Xóa toàn bộ cart
  async clearCart(userId) {
    const cart = await this.getUserCart(userId);
    await CartItem.destroy({ where: { cart_id: cart.id } });
    return true;
  }
}

export default new CartService();
