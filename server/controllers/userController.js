import User from "../models/userModel.js";
import ErrorResponse from "../utils/gobalError.js";

/**
 * Description: Load all users
 * Route: /users
 * Role:Admin
 */

export const allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
      page: page,
      pages: Math.ceil(count / pageSize),
      count: count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Description: show single user
 * Route: /user/:id
 * Role:Admin
 */

export const singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Description: Edit user
 * Route: /user/edit/:id
 * Role:Admin
 */

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Description: Delete user
 * Route: /user/delete/:id
 * Role:Admin
 */

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Description: create job history
 * Route: /user/job-history/create
 */
export const createJobHistory = async (req, res, next) => {
  const { title, description, salary, location } = req.body;
  try {
    //check if user exit
    const currentUser = await User.findOne({ _id: req.user._id });

    if (!currentUser) {
      return next(new ErrorResponse("You must log in", 401));
    } else {
      const addJobHistory = {
        title,
        description,
        salary,
        location,
        user: req.user._id,
      };
      currentUser.jobHistory.push(addJobHistory);
      await currentUser.save();
    }
    res.status(200).json({
      success: true,
      message: "Job history added successfully",
      data: currentUser,
    });
    next();
  } catch (error) {
    return next(error);
  }
};
