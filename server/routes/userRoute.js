import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import {
  allUsers,
  createJobHistory,
  deleteUser,
  singleUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

//?auth routes

//all users api
userRouter.get("/allusers", isAuthenticated, isAdmin, allUsers);

//get single user api
userRouter.get("/user/:id", isAuthenticated, singleUser);

//update user api
userRouter.put("/user/edit/:id", isAuthenticated, updateUser);

//delete user api
userRouter.delete("/user/delete/:id", isAuthenticated, isAdmin, deleteUser);

//create job history api
userRouter.post("/user/jobhistory", isAuthenticated, isAdmin, createJobHistory);

export default userRouter;
