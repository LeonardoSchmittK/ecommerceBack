import { Router } from "express";
import multer from "multer";
import ProductsController from "../controller/productsController.js";
import jwt from "jsonwebtoken";
import validadorCookies from "../middlewares/validadorCookies.js";

const productRoutes = Router();
const upload = multer();

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ auth: false, message: "Não há token disponível." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ auth: false, message: "Token malformado." });
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Erro em autenticar token." });
    }

    req.userId = decoded.id;
    next();
  });
}

// GET
productRoutes.get("/", validadorCookies, ProductsController.getProducts);
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
