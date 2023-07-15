import Job from "../models/jobModel.js";
import JobType from "../models/jobTypeModel.js";
import ErrorResponse from "../utils/gobalError.js";

/**
 * Description: create job
 * Route: /job/create
 * Role:Admin
 */
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      available: req.body.available,
      JobType: req.body.JobType,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: get all jobs
 * Route: /jobs
 * Role:Admin
 */
export const allJobs = async (req, res, next) => {
  //enable search query
  const keyword = req.query.keyword
    ? {
        // get all jobs that match the keyword
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  //filter by job category id
  const ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.map((cat) => {
    ids.push(cat._id);
  });

  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  const location = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.map((item) => {
    location.push(item.location);
  });
  //remove duplication
  let setUniqueLocation = [...new Set(location)];
  let locate = req.query.location;
  //filter location
  let locationFilter = locate !== "" ? locate : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //   const count = await Job.find({}).estimatedDocumentCount();

  // count the number of jobs that match the keyword
  const count = await Job.find({
    ...keyword,
    JobType: categ,
    location: locationFilter,
  }).countDocuments();

  try {
    //count the number of jobs that match the keyword
    const job = await Job.find({
      ...keyword,
      JobType: categ,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    //return all jobs if successful
    res.status(201).json({
      success: true,
      message: "All jobs fetched successfully",
      data: job,
      page: page,
      pages: Math.ceil(count / pageSize),
      count: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: get single job
 * Route: /job
 * Role:Admin
 */
export const singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    res.status(201).json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Description: update job
 * Route: put /edit/job/:id
 * Role:Admin
 */
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("JobType", "JobTypeName")
      .populate("user", ["firstName", "lastName"]);

    res.status(201).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};
