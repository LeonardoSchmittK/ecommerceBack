import { Router } from "express";
import multer from "multer";
import ProductsController from "../controller/productsController.js"; // Ensure the file path and extension are correct

const productRoutes = Router(); // It's better to use `Router()` instead of `new Router()`
const upload = multer();

// GET
productRoutes.get("/", ProductsController.getProducts);
productRoutes.get("/pesquisarId/:id", ProductsController.getProductById);
productRoutes.get(
  "/filtrar/menorPreco",
  ProductsController.getProductsByLowerPrice
);
productRoutes.get(
  "/filtrar/maiorPreco",
  ProductsController.getProductsByHigherPrice
);
productRoutes.get(
  "/pesquisar/:search",
  ProductsController.getProductsBySearching
);

// POST
productRoutes.post(
  "/",
  upload.single("image"),
  ProductsController.createProduct
);
// UPDATE

productRoutes.put("/", ProductsController.updateProduct);

// DELETE
productRoutes.delete("/:id", ProductsController.deleteProductById);

export default productRoutes;
