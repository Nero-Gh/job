import express from "express";
import {
  logout,
  signIn,
  signUp,
  userProfile,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";

const authRouter = express.Router();

//?auth routes
authRouter.post("/register", signUp);

authRouter.post("/login", signIn);

//user logout api
authRouter.get("/logout", logout);

//user profile api
authRouter.get("/profile", isAuthenticated, userProfile);

export default authRouter;
