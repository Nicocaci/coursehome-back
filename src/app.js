import express from "express";
import mongoose from "mongoose";

import productRouter from "./router/product-router.js";
import userRouter from "./router/user-router.js";
import cartRouter from "./router/cart-router.js";
import orderRouter from "./router/order-router.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conectado  a MongoDB Correctamente"))
.catch((error) => console.log("Error al conectar la base de datos", error));



// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//Rutas

app.get("/", (req, res) => {
    res.send("Hola mundo");
});
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

