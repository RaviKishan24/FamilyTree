import express from "express";
import {
  CreateFamily,
  findFamilies,
  FindOneFamily,
} from "../Controller/FamillyController.js";
import checkAuth from "../Authentication/auth.js";
const familyRouter = express.Router();
familyRouter.post("/create", checkAuth, CreateFamily);
familyRouter.get("/families", checkAuth, findFamilies);
familyRouter.get("/:id", checkAuth, FindOneFamily);

export default familyRouter;
