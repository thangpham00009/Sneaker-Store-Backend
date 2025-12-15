import CartService from "../services/cart.service.js";

class CartController {
  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getUserCart(userId);
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

async addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId, quantity, size } = req.body;

    if (!size) {
      return res.status(400).json({ message: "Chưa chọn size" });
    }

    const productIdNum = Number(productId);

    const item = await CartService.addItem(
      userId,
      productIdNum,
      quantity,
      size
    );

    res.json(item);
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}



async updateCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { productId, quantity, size } = req.body;

    const item = await CartService.updateItem(userId, productId, quantity, size);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async removeCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { size } = req.query; 

    if (!size) {
      return res.status(400).json({ message: "Thiếu size" });
    }

    await CartService.removeItem(
      userId,
      Number(productId),
      String(size)
    );

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("REMOVE CART ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}

    async clearCart(req, res) {
    try {
      const userId = req.user.id;
      await CartService.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new CartController();
