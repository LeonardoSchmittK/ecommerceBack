import express from "express";
import productRoutes from "./routes/productsRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtos", productRoutes);

// rodar o servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});
