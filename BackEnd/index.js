// ✅ Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ✅ Check if required environment variables exist
const requiredEnvVars = [
  "MONGODB_URI", // MongoDB connection string
  "JWT_SECRET", // JWT secret for auth
  "GITHUB_USERNAME", // For repo creation
  "GITHUB_TOKEN", // GitHub Personal Access Token
  "VERCEL_TOKEN", // Vercel deployment token
  "GEMINI_API_KEY_CHATBOT", // Chatbot API key
  "GEMINI_API_KEY_EXTRACT", // Resume extraction API key
];

requiredEnvVars.forEach((env) => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// ✅ Connect to the database
require("./Models/db");

// ✅ Initialize Express app
const app = express();

// ✅ Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date(),
    memoryUsage: process.memoryUsage(),
  });
});

// ✅ Import and mount all routes
const AuthRouter = require("./Routes/AuthRouter");
const GeneratorRouter = require("./Routes/GeneratorRouter");
const resumeRoute = require("./Routes/resumeRoute");
const ChatbotRouter = require("./Routes/chatbot.routes");

app.use("/auth", AuthRouter);
app.use("/generator", GeneratorRouter);
app.use("/api/chatbot", ChatbotRouter);
const PaymentRouter = require("./Routes/PaymentRouter");
app.use("/payment", PaymentRouter);
app.use("/", resumeRoute); // Handles resume uploads or extraction

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global error handler:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ✅ Graceful shutdown on SIGTERM (for production environments)
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
