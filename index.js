import express from "express";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv-safe";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./documentation.yaml");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rotas

app.use("/produtos", productRoutes);
app.use("/clientes", userRoutes);
app.use("/auth", authRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none",
    },
  })
);

// rodar o servidor

const port = 4000;
app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});

export default app;
