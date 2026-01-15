import ProductController from "../controller/product-controller.js";
import express from "express";
import upload from "../config/multerConfig.js"

const router = express.Router();

router.post('/', upload.array('imagen', 10), ProductController.createProduct);
router.get('/', ProductController.getProucts);
router.get('/category/:category', ProductController.getProductByCategory);
router.get('/subcategory/:subcategory', ProductController.getProductBySubcategory);
router.get('/:pid', ProductController.getProductById);
router.get('/sku/:sku', ProductController.getProductBySku);
router.put('/:pid', upload.array('imagen', 10), ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);
export default router;