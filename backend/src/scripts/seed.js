import { Product } from "../models/Product.js";
import { api } from "../../../frontend/src/services/config.js";
import { dbConnection } from "./dbConnection.js";
import mongoose from "mongoose";

async function productInitialization() {
  try {
    const products = await api.get("/products");
    dbConnection()
    await mongoose.disconnect()
    console.log(`
Products initialized!
DB disconnected!`)
  } catch (error) {
    console.error(`Error fetching data from products:`, error.message);
  }
}

productInitialization();
