import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validateRequest } from "../utils/httpHandlers";
import { validateCreateProduct, validateUpdateProduct, validateProductNameQuery } from "../schemas/productSchema";

const productController = new ProductController();

export const productRouter = Router();

productRouter.post("/products", validateRequest(validateCreateProduct.body), productController.createProduct);
productRouter.get("/products", productController.getAllProducts);
productRouter.get("/products/:id", productController.getProductById);
productRouter.put("/products/:id", validateRequest(validateUpdateProduct.body), productController.updateProduct);
productRouter.delete("/products/:id", productController.deleteProduct);

export default productRouter;
