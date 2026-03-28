import "dotenv/config";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT;
const server = express();
server.use(express.json());
server.use(cookieParser());

server.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))

server.listen(PORT,()=>{
console.log(`Server is running on : http://localhost:${PORT}`)

})




