import "dotenv/config";                    // ✅ loads .env first
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./familytreeDb.js";
import familyRouter from "./Routes/FamilyRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import checkAuth from "./Authentication/auth.js";

const PORT = process.env.PORT;
const server = express();

server.use(express.json());                // ✅ parse JSON body
server.use(cookieParser());                // ✅ parse req.cookies

server.use(                              // ✅ CORS with credentials
  cors({
    origin: "https://familytreevisualizer.netlify.app",
    credentials: true,
  })
);

// ✅ FIXED: now has a handler that SENDS a response
server.get("/api/check-auth", checkAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated",
    user: req.user,
  });
});

server.use("/api/family", familyRouter);
server.use("/api/user", userRouter);

// ✅ Global error handler (last)
server.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log(`Sever is running on : http://localhost:${PORT}`);  
    });
  } catch (error) {
    console.log("Failed to start Server ", error);
  }
};

startServer();