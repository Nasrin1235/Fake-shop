import { Product } from "../models/Product.js";
import { api } from "./config.js";
import { dbConnection } from "./dbConnection.js";

export async function seed() {
  try {
    await dbConnection()
    const products = (await api.get("/products")).map(product => {
      product.stockQuantity = 5
      return product
    });
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log(`
Products initialized!!!
`)
  } catch (error) {
    console.error(`Error fetching data from products:`, error.message);
  }
}

// seed();
