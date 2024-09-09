import { Router } from "express";
import AuthController from "../controller/AuthController.js";

const authRoutes = Router();

// GET
authRoutes.get("/", AuthController.helloWorld);

export default authRoutes;
