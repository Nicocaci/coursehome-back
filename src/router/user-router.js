import UserController from "../controller/user-controller.js";
import express from "express";
import auth from "../middlewares/auth-middleware.js"

const router = express.Router();

router.get('/',auth(['admin']), UserController.getUsers);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logOut);
router.delete('/:uid', UserController.deleteUser);
router.put('/:uid', UserController.updateUser);
router.get('/:uid', UserController.getUserById);
router.get('/:email', UserController.getUserByEmail);
export default router;