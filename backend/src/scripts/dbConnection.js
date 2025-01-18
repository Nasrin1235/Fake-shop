import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI;
console.log("MONGODB_URI:", dbURI);

console.log(dbURI)
export const dbConnection = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("DB connected!");
  } catch (error) {
    console.error("Error connecting to DB");
  }
};
