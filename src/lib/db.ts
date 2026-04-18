import mongoose from "mongoose";

export default async function mongo() {
  const MONGO = process.env.MONGO_URI;
  if (!MONGO) {
    throw new Error("Mongo is not defined");
  }
  try {
    await mongoose.connect(MONGO);
    console.log("Mongoose connected");
  } catch (error) {
    console.error(error);
  }
}
