import { Router } from "express";
import UserController from "../controller/userController.js";

const userRoutes = Router();

// GET
userRoutes.get("/", UserController.getUsers);
userRoutes.get("/:id", UserController.getUserById);

// POST
userRoutes.post("/", UserController.createUser);

// UPDATE
userRoutes.put("/", UserController.updateUser);

// DELETE
userRoutes.delete("/:id", UserController.deleteProductById);

export default userRoutes;
