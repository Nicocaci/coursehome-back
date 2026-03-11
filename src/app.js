import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRouter from "./router/product-router.js";
import userRouter from "./router/user-router.js";
import cartRouter from "./router/cart-router.js";
import orderRouter from "./router/order-router.js";
import mercadoPagoRouter from "./router/mp-router.js";
import contactoRouter from "./router/contacto.router.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = ["http://localhost:5173", "https://www.cfhomedeco.com"];

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado  a MongoDB Correctamente"))
  .catch((error) => console.log("Error al conectar la base de datos", error));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

//Rutas

app.get("/", (req, res) => {
  res.send("Hola mundo");
});
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/mp", mercadoPagoRouter);
app.use("/api/contacto", contactoRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
