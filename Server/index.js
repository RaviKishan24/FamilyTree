import "dotenv/config";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./familytreeDb.js";
import familyRouter from "./Routes/FamilyRoutes.js";
import userRouter from "./Routes/UserRoutes.js"
import nodemailer from "nodemailer"
import checkAuth from "./Authentication/auth.js";

const PORT = process.env.PORT;
const server = express();
server.use(express.json());
server.use(cookieParser());

server.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

server.use("/api/family", familyRouter);
server.use("/api/user",userRouter);
server.get("/check-auth",checkAuth)

const startServer = async () => {
    try {
        await connectDb();
        server.listen(PORT, () => {
            console.log(`Sever is running on : http://localhost:${PORT}`)
        });

    } catch (error) {
        console.log("Failed to start Server ", error)
    }
}

startServer();



