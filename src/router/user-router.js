import UserController from "../controller/user-controller.js";
import express from "express";
import auth from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", auth(), UserController.logOut);

// 👤 PERFIL PROPIO
router.get("/me", auth(), UserController.getMe);

// 👑 ADMIN
router.get("/", auth(["admin"]), UserController.getUsers);
router.delete("/:uid", auth(["admin"]), UserController.deleteUser);

// 👤 USER / ADMIN
router.get("/:uid", auth(), UserController.getUserById);
router.put("/:uid", auth(), UserController.updateUser);

export default router;
