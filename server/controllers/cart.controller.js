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
      const { productId, quantity } = req.body;

      const item = await CartService.addItem(userId, productId, quantity);
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const item = await CartService.updateItem(userId, productId, quantity);
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async removeCartItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      await CartService.removeItem(userId, productId);
      res.json({ message: "Item removed from cart" });
    } catch (err) {
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
