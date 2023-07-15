import ErrorResponse from "../utils/gobalError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//check is user authenticated
export const isAuthenticated = async (req, res, next) => {
  //get token
  const { token } = req.cookies;

  //check if cookie exit
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    //if token exit
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

//Is admin middleware
export const isAdmin = async (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access denied, you must be an admin", 401));
  }
  next();
};
