import { Product } from '../models/Product.js'
import { api } from "../../../frontend/src/services/config.js";

async function getProducts() {
  try {
    const products = await api.get("/products")
    return products
  } catch (error) {
    console.error(`Error fetching data from products:`, error.message);
    return []
  }
}

const products = getProducts()
console.log('products:', products)

