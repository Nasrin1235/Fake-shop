import express from "express";
import path from "path";
import { Product } from "./src/models/Product.js";
import { fileURLToPath } from "url";
import { dbConnection } from "./src/scripts/dbConnection.js";
import { seed } from "./src/scripts/seed.js";
import cors from 'cors'
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";

const app = express();
const PORT = process.env.PORT || 3001;

const _fileName = fileURLToPath(import.meta.url);
const _path = path.dirname(_fileName);
const frontendDistPath = path.join(_path, "../frontend/dist");

// Initialize DB connection when the server starts
await dbConnection();

app.use(express.static(frontendDistPath));
app.use(cors())

app.use("/users", userRouter); 
app.use("/products", productRouter); 

// Check if products exist and seed the DB if necessary
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

// Initialize products on server startup
initializeProducts();

// Return frontend on any undefined route
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
