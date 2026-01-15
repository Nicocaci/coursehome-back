import ProductDao from "../dao/product-dao.js";

class ProductRepository {
    async createProduct(data) {
        return await ProductDao.createProduct(data);
    }
    async getProducts(page, limit, q = '') {
        return await ProductDao.getProducts(page, limit, q);
    }
    async getProductBySku(sku) {
        return await ProductDao.getProductBySku(sku);
    }
    async getProductById(pid) {
        return await ProductDao.getProductById(pid);
    }
    async getProductByCategory(categoria, page, limit) {
        return await ProductDao.getProductByCategory(categoria, page, limit);
    }
    async getProductBySubCategory(subcategoria, page, limit){
        return await ProductDao.getProductBySubCategory(subcategoria, page, limit);
    }
    async updateProduct(pid, data) {
        return await ProductDao.updateProduct(pid, data);
    }
    async deleteProduct(pid){
        return await ProductDao.deleteProduct(pid);
    }
}

export default new ProductRepository();