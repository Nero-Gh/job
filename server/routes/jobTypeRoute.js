import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import {
  allJobsType,
  createJobType,
} from "../controllers/jobTypeConterller.js";

const jobTypeRouter = express.Router();

//?auth routes

//create job type api
jobTypeRouter.post("/type/create", isAuthenticated, createJobType);

//all jobs type api
jobTypeRouter.get("/type/jobs", isAuthenticated, isAdmin, allJobsType);

export default jobTypeRouter;
