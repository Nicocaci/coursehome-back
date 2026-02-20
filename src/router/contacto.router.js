import express from "express";
import { sendContactoEmail } from "../controller/contacto.controller.js";

const router = express.Router();

router.post("/", sendContactoEmail);
export default router;

