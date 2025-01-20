import { seed } from "./seed.js";
import mongoose from "mongoose";

const runSeed = async () => {
  try {
    await seed();
  } finally {
    await mongoose.disconnect(); 
    console.log("Database connection closed");
  }
};

runSeed()
