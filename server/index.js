import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import authProtector from "./middlewares/authProtector.js"
import transactionRoutes from "./routes/transactionRoutes.js"


dotenv.config()

const app = express()
app.use(cors({
  origin: ["http://localhost:5173", "https://personal-finance-tracker-five-peach.vercel.app"],
  credentials: true
}));
app.use(express.json({ limit: "2mb" }))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions",authProtector, transactionRoutes);  //inline middleware

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })
