import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import CartModel from "../dao/model/cart-model.js";
import OrderModel from "../dao/model/order-model.js";
import dotenv from "dotenv";
dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

/* ===============================
   CREAR PREFERENCE (CHECKOUT MP)
================================ */

export const createOrder = async (req, res) => {
  try {
    const { cart, payer } = req.body;

    console.log("=== CREATE ORDER REQUEST ===");
    console.log("Cart ID:", cart?._id);
    console.log("Payer:", payer);

    if (!cart || !cart.products || cart.products.length === 0) {
      console.log("ERROR: carrito vacío");
      return res.status(400).json({ error: "Carrito vacío" });
    }

    const items = cart.products.map((item) => ({
      title: item.product.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.product.precio),
      currency_id: "ARS",
    }));

    const body = {
      items,

      payer: {
        name: payer.name,
        surname: payer.surname,
        email: payer.email,
      },

      external_reference: cart._id,

      metadata: {
        cart_id: cart._id,
      },

      notification_url:
        "https://coursehome-back-production.up.railway.app/api/mp/webhook",

      back_urls: {
        success: "https://www.cfhomedeco.com/gracias",
        failure: "https://www.cfhomedeco.com/error",
        pending: "https://www.cfhomedeco.com/pendiente",
      },

      auto_return: "approved",
    };

    console.log("=== BODY ENVIADO A MP ===");
    console.log(JSON.stringify(body, null, 2));

    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log("=== PREFERENCE CREADA ===");
    console.log("Preference ID:", result.id);
    console.log("Init Point:", result.init_point);
    console.log("Sandbox:", result.sandbox_init_point);

    res.json({
      preferenceId: result.id,
      init_point: result.init_point,
    });
  } catch (error) {
    console.error("=== ERROR CREANDO PREFERENCE ===");
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   WEBHOOK MERCADO PAGO
================================ */

export const mercadoPagoWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const payment = await new Payment(client).get({
        id: data.id,
      });

      if (payment.status === "approved") {
        const cartId = payment.metadata?.cart_id || payment.external_reference;

        console.log("Pago aprobado para cart:", cartId);

        const cart =
          await CartModel.findById(cartId).populate("products.product");

        if (!cart) {
          console.log("Carrito no encontrado");
          return res.sendStatus(200);
        }

        // evitar orden duplicada
        const existingOrder = await OrderModel.findOne({
          paymentId: payment.id,
        });

        if (existingOrder) {
          console.log("Orden ya existe");
          return res.sendStatus(200);
        }

        const total = cart.products.reduce((acc, item) => {
          return acc + item.product.precio * item.quantity;
        }, 0);

        const newOrder = new OrderModel({
          user: cart.user,
          cart: cartId,
          paymentId: payment.id,
          products: cart.products,
          total: total,
          paymentMethod: "mercadopago",
          status: "pendiente",
        });

        await newOrder.save();

        console.log("Orden creada:", newOrder._id);

        // limpiar carrito
        cart.products = [];
        await cart.save();

        console.log("Carrito limpiado");
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};
