import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import jwt from "jsonwebtoken";

const authRoutes = Router();

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
authRoutes.get("/", AuthController.helloWorld);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);

export default authRoutes;
