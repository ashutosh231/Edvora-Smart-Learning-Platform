import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connect = () => {
  if (!process.env.MONGODB_URL || process.env.MONGODB_URL.includes('your_username')) {
    console.log("⚠️  WARNING: MONGODB_URL not properly configured in .env file");
    console.log("⚠️  Please update your .env file with a valid MongoDB connection string");
    console.log("⚠️  Server will start but database features won't work");
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ DB Connected Successfully"))
    .catch((error) => {
      console.log("❌ DB Connection Failed");
      console.error(error);
      console.log("⚠️  Server will continue running but database features won't work");
    });
};

