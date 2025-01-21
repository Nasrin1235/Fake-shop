import express from "express";
import path from "path";
import { Product } from "./src/models/Product.js";
import { fileURLToPath } from "url";
import { dbConnection } from "./src/scripts/dbConnection.js";
import { seed } from "./src/scripts/seed.js";
import cors from "cors";
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const _fileName = fileURLToPath(import.meta.url);
const _path = path.dirname(_fileName);
const frontendDistPath = path.join(_path, "../frontend/dist");

await dbConnection();
app.use(express.static(frontendDistPath));
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

const initializeProducts = async () => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      console.log("No products found, seeding database...");
      await seed();
    }
  } catch (error) {
    console.error("Error while fetching products:", error);
  }
};

initializeProducts();

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
