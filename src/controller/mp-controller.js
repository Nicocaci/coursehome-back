import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
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
    console.log("====== WEBHOOK RECIBIDO ======");
    console.log(JSON.stringify(req.body, null, 2));

    const { type, data } = req.body;

    if (type === "payment") {
      console.log("Webhook tipo PAYMENT");

      const payment = await new Payment(client).get({
        id: data.id,
      });

      console.log("====== PAYMENT INFO ======");
      console.log("Payment ID:", payment.id);
      console.log("Status:", payment.status);
      console.log("Status Detail:", payment.status_detail);
      console.log("External Reference:", payment.external_reference);
      console.log("Metadata:", payment.metadata);

      if (payment.status === "approved") {
        console.log("PAGO APROBADO");

        const cartId = payment.metadata?.cart_id || payment.external_reference;

        console.log("Cart ID asociado:", cartId);

        /*
        ACA DEBERÍAS ACTUALIZAR O CREAR LA ORDEN
        EJEMPLO:

        await Order.findOneAndUpdate(
          { cart: cartId },
          { status: "pagado" }
        );
        */

        console.log("Orden debería marcarse como PAGADA");
      } else {
        console.log("Pago no aprobado:", payment.status);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("====== ERROR WEBHOOK ======");
    console.error(error);
    res.sendStatus(500);
  }
};
