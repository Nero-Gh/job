import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import {
  allJobsType,
  createJobType,
  deleteJobsType,
  updateJobsType,
} from "../controllers/jobTypeConterller.js";

const jobTypeRouter = express.Router();

//?auth routes

//create job type api
jobTypeRouter.post("/type/create", isAuthenticated, isAdmin, createJobType);

//all jobs type api
jobTypeRouter.get("/type/jobs", isAuthenticated, allJobsType);

//update job type api
jobTypeRouter.put(
  "/type/update/jobs/:id",
  isAuthenticated,
  isAdmin,
  updateJobsType
);

//deleted job type api
jobTypeRouter.delete(
  "/type/update/jobs/:id",
  isAuthenticated,
  isAdmin,
  deleteJobsType
);

export default jobTypeRouter;
