import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [32, "First name cannot exceed 32 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [32, "Last name cannot exceed 32 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//encrypt password before saving
userSchema.pre("save", async function (next) {
  //if password is not modified
  if (!this.isModified("password")) {
    next();
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generateToken
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

export default mongoose.model("User", userSchema);
