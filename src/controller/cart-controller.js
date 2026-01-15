import CartService from "../service/cart-service.js";

const mapCartErrorToResponse = (res, error) => {
    if (error?.message === 'Carrito no encontrado') {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    if (error?.message === 'Producto no encontrado en el carrito') {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
};

class CartController {

    async createCart(req, res) {
        try {
            const newCart = await CartService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            mapCartErrorToResponse(res, error);
        }
    }

    async getCarts(req, res) {
        try {
            const carts = await CartService.getCarts();
            res.status(200).json(carts);
        } catch (error) {
            mapCartErrorToResponse(res, error);
        }
    }

    async getCartById(req, res) {
        const cid = req.params.cid
        try {
            const cart = await CartService.getCartById(cid);
            if (!cart) {
                return res.status(404).json({
                    message: 'Carrito no encontrado'
                })
            }
            res.status(200).json(cart)
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }

    async addProductToCart(req, res) {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;
        if (!cid || !pid) {
            return res.status(400).json({ message: 'Se requiere el identificador del carrito y del producto' });
        }
        if (Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
            return res.status(400).json({ message: 'La cantidad debe ser un número mayor que cero' });
        }
        try {
            const addProduct = await CartService.addProductToCart(cid, pid, quantity);
            res.status(200).json({
                message: 'Producto agregado correctamente',
                addProduct
            })
        } catch (error) {
            mapCartErrorToResponse(res, error);
        }
    }

    async removeProductFromCart(req, res) {
        const cid = req.params.cid;
        const pid = req.params.pid;
        if (!cid || !pid) {
            return res.status(400).json({ message: 'Se requiere el identificador del carrito y del producto' });
        }
        try {
            const removeProduct = await CartService.removeProductFromCart(cid, pid);
            res.status(200).json({
                message: 'Producto Eliminado correctamente'
            });
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }
    async updateProductQuantity(req, res) {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;
        if (!cid || !pid) {
            return res.status(400).json({ message: 'Se requiere el identificador del carrito y del producto' });
        }
        if (Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
            return res.status(400).json({ message: 'La cantidad debe ser un número mayor que cero' });
        }
        try {
            const updateProduct = await CartService.updateProductQuantity(cid, pid, quantity);
            res.status(200).json(updateProduct);
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }
    async updateCart(req, res) {
        const cid = req.params.cid;
        const data = req.body;
        try {
            const cart = await CartService.updateCart(cid, data);
            if (!cart) {
                return res.status(404).json({
                    message: 'Carrito no encontrado'
                })
            }
            res.status(200).json(cart)
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }
    async deleteCart(req, res) {
        const cid = req.params.cid;
        try {
            const cart = await CartService.deleteCart(cid);
            if (!cart) {
                return res.status(404).json({
                    message: 'Carrito no encontrado'
                })
            }
            res.status(200).json(cart)
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }
    async clearCart(req, res) {
        const cid = req.params.cid;
        if (!cid) {
            return res.status(400).json({ message: 'Se requiere el identificador del carrito' });
        }
        try {
            const cart = await CartService.clearCart(cid);
            res.status(200).json(cart);
        } catch (error) {
            mapCartErrorToResponse(res, error)
        }
    }

}

export default new CartController();