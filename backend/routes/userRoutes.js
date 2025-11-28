import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData, adminLogin } from "../controllers/userController.js";

const router = express.Router();

router.get("/data", userAuth, getUserData);
router.post("/admin", adminLogin); 

export default router;
