import JobType from "../models/jobTypeModel.js";
import ErrorResponse from "../utils/gobalError.js";

/**
 * Description: create job category
 * Route: /type/create
 * Role:Admin
 */
export const createJobType = async (req, res, next) => {
  try {
    if (req.body.jobTypeName) {
      return next(new ErrorResponse("Job Category already exit", 400));
    }
    const jobtype = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job Category created successfully",
      data: jobtype,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: get all jobs category
 * Route: /type/jobs
 * Role:Admin
 */
export const allJobsType = async (req, res, next) => {
  try {
    const jobtype = await JobType.find({}).sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      message: "All jobs fetched successfully",
      data: jobtype,
    });
  } catch (error) {
    next(error);
  }
};
