import express from "express";
import { CreateFamily,findFamilies } from "../Controller/FamillyController.js"
import checkAuth from "../Authentication/auth.js";
const familyRouter = express.Router();
familyRouter.post("/create", checkAuth, CreateFamily);
familyRouter.get("/familes",checkAuth, findFamilies)


export default familyRouter;