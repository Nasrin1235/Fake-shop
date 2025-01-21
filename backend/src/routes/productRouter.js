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

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ id: id });
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).json({
    message: "not found",
  });
});

productRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { quantityToAdd } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, 
      { 
        $inc: { stockQuantity: Number(quantityToAdd) }, 
        $set: { quantity: 0 } 
      }, 
      { new: true } 
    );

    if (updatedProduct) {
      res.status(200).json({
        message: "Product stock updated successfully.",
        product: updatedProduct,
      });
    } else {
      res.status(404).json({ message: `Product with id ${id} not found.` });
    }
  } catch (error) {
    console.error("Error updating product stock:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

productRouter.patch("/update-stock", async (req, res) => {
  const { Increment, id } = req.body;

  try {
    // Step 1: Find the product by ID
    const product = await Product.findOne({ id: id });

    // Step 2: If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Step 3: Check if the stock is sufficient
    if (product.stockQuantity < Increment) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    // Step 4: Decrease stockQuantity and increase quantity
    product.stockQuantity -= Increment;
    product.quantity += Increment;

    // Step 5: Save the updated product
    await product.save();

    // Step 6: Return the updated product and success message
    return res.status(200).json({
      message: "Stock updated successfully",
      product,
    });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error updating stock:", error);
    return res.status(500).json({
      message: "Error updating stock",
      error: error.message,
    });
  }
});

export default productRouter;
