import { Router } from "express";
import {
  getUserInfo,
  registerUser,
  getUserId,
  loginUser,
} from "../controllers/user";

const router = Router();

router.post("/login", loginUser);
router.get("/user", getUserInfo);
router.get("/user/:id", getUserId);
router.post("/register", registerUser);

export default router;
