import Razorpay from "razorpay";
import dotenv from "dotenv";

// Load .env (no-op if env vars set externally, e.g. Netlify)
dotenv.config();

// Debug logs (optional)
console.log("🔹 Razorpay Config Loaded");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "Loaded ✅" : "Missing ❌");

// ✅ Make Razorpay optional for development (only warn, don't crash)
let instance = null;

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  console.warn("⚠️  WARNING: RAZORPAY_KEY_ID or RAZORPAY_SECRET missing in .env file");
  console.warn("⚠️  Payment features will not work. This is OK for development/testing auth features.");
} else {
  // ✅ Create Razorpay instance only if keys are present
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  console.log("✅ Razorpay instance created successfully");
}

export { instance };
