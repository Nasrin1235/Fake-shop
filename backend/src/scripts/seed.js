import { Product } from "../models/Product.js";
import { api } from "../../../frontend/src/services/config.js";
import { dbConnection } from "./dbConnection.js";
import mongoose from "mongoose";

async function productInitialization() {
  try {
    dbConnection()
    const products = (await api.get("/products")).map(product => {
      product.stockQuantity = 5
      return product
    });
    await Product.deleteMany()
    await Product.insertMany(products)
    await mongoose.disconnect()
    console.log(`
Products initialized!
DB disconnected!`)
  } catch (error) {
    console.error(`Error fetching data from products:`, error.message);
  }
}

productInitialization();
