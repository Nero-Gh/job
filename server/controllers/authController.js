import User from "../models/userModel.js";
import ErrorResponse from "../utils/gobalError.js";

/**
 *
 * @Create a new user
 * !Role: User
 * @returns
 */
export const signUp = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  //check user
  const userExit = await User.findOne({ email });
  if (userExit) {
    return next(new ErrorResponse("Email is already taken", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @Sign in by User
 * !Role: User
 * @returns
 */
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorResponse("Please add email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("Please add password", 403));
    }

    //check userEmail
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid response"), 400);
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid response"), 400);
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, statusCode, res) => {
  const token = await user.getJwtToken();
  res
    .status(statusCode)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, token, user });
};

/**
 *
 * @Logout in by User
 * !Role: User
 * @returns
 */

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User Logged Out",
  });
};

/**
 *
 * @User Profile
 * !Role: User
 * @returns
 */

export const userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    data: user,
  });
};
