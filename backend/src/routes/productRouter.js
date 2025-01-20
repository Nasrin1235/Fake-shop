import express from "express";
import { Product } from "../models/Product.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (products && products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

productRouter.get("/categories", async (req, res) => {
  try {
    const products = await Product.find();
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    if (categories && categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

productRouter.patch("/update-stock", async (req, res) => {
  const { id, Increment } = req.body;

  try {
    const product = await Product.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.stockQuantity += Increment;
    console.log(product);
    await product.save();
    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    return res
      .status(500)
      .json({ message: "Error updating stock", error: error.message });
  }
});

export default productRouter;
