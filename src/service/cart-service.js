import CartRepository from "../repository/cart-repository.js";

class CartService {
        async createCart(data) {
            return await CartRepository.createCart(data);
        }
        async getCartById(cid) {
            return await CartRepository.getCartById(cid);
        }
        async updateCart(cid, cart) {
            return await CartRepository.updateCart(cid, cart);
        }
        async deleteCart(cid) {
            return await CartRepository.deleteCart(cid);
        }
        async getCarts() {
            return await CartRepository.getCarts();
        }
        async addProductToCart(cid, pid, quantity) {
            return await CartRepository.addProductToCart(cid, pid, quantity);
        }
        async removeProductFromCart(cid, pid) {
            return await CartRepository.removeProductFromCart(cid, pid);
        }
        async updateProductQuantity(cid, pid, quantity) {
            return await CartRepository.updateProductQuantity(cid, pid, quantity);
        }
        async clearCart(cid) {
            return await CartRepository.clearCart(cid);
        }
}

export default new CartService();