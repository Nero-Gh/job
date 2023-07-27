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
      jobtype,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: update jobs category
 * Route: /type/update/jobs/:id
 * Role:Admin
 */
export const updateJobsType = async (req, res, next) => {
  try {
    const jobtype = await JobType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Job updated  successfully",
      data: jobtype,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: delete jobs category
 * Route: /type/delete/jobs/:id
 * Role:Admin
 */
export const deleteJobsType = async (req, res, next) => {
  try {
    const jobtype = await JobType.findByIdAndRemove(req.params.id);

    res.status(201).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
