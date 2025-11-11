// import { cloudinaryConnect } from "./config/cloudinary.js";
// import { connect } from "./config/database.js";
// import contactUsRoute from "./routes/Contact.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import courseRoutes from "./routes/Course.js";
// import dotenv from "dotenv";
// // ---------------- Imports ----------------
// import express from "express";
// import fileUpload from "express-fileupload";
// import paymentRoutes from "./routes/Payment.js";
// import profileRoutes from "./routes/Profile.js";
// import serverless from "serverless-http";
// // ---------------- Routes ----------------
// import userRoutes from "./routes/User.js";

// // ---------------- Config ----------------
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 4000;

// // ---------------- Database ----------------
// connect();

// // ---------------- ✅ GLOBAL CORS ----------------
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://edvora-hazel.vercel.app");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Requested-With"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
// app.use(
// 	cors({
// 		origin:"http://localhost:3000",
// 		credentials:true,
// 	})
// )



// // ---------------- Middlewares ----------------
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

// // ---------------- Cloudinary ----------------
// cloudinaryConnect();

// // ---------------- Routes ----------------
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// // ---------------- Default Route ----------------
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ Server is up and CORS-enabled",
//   });
// });

// // ---------------- Server Setup ----------------
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => console.log(`✅ Running locally on port ${PORT}`));
// }

import { cloudinaryConnect } from "./config/cloudinary.js";
import { connect } from "./config/database.js";
import contactUsRoute from "./routes/Contact.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoutes from "./routes/Course.js";
import dotenv from "dotenv";
// ---------------- Imports ----------------
import express from "express";
import fileUpload from "express-fileupload";
import paymentRoutes from "./routes/Payment.js";
import profileRoutes from "./routes/Profile.js";
import serverless from "serverless-http";
// ---------------- Routes ----------------
import userRoutes from "./routes/User.js";

// ---------------- Config ----------------
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ---------------- Database ----------------
connect();

// ---------------- ✅ FIXED GLOBAL CORS ----------------
// ⚠️ REMOVE ALL MANUAL res.header CORS CODE
const allowedOrigins = [
  "http://localhost:3000",
  // "http://localhost:3000/",
  "https://edvora-beryl.vercel.app", // deployed frontend (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ---------------- Middlewares ----------------
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ---------------- Cloudinary ----------------
cloudinaryConnect();

// ---------------- Routes ----------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ---------------- Default Route ----------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "✅ Server is up and CORS-enabled",
  });
});

// ---------------- Server Setup ----------------
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Running locally on port ${PORT}`));
}

// ---------------- Export for Serverless ----------------
export const handler = serverless(app);
