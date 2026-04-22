import mongoose from "mongoose";

// eslint-disable-next-line prefer-const
let isConnected = false;

export default async function mongo() {
  if (isConnected) return;

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
