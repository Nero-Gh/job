import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { allJobs, createJob, singleJob, updateJob } from "../controllers/jobController.js";

const jobRouter = express.Router();

//?auth routes

//create job type api
jobRouter.post("/job/create", isAuthenticated, isAdmin, createJob);

//all jobs api
jobRouter.get("/job", isAuthenticated, allJobs);

//single job api
jobRouter.get("/job/:id", isAuthenticated, singleJob);

//single job api
jobRouter.put("/job/update/:id", isAuthenticated, isAdmin, updateJob);

export default jobRouter;
