import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import DB_CONNECT from "./db/index.js";
import errorHandler from "./middleware/error.js";

//?import routes
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import jobTypeRouter from "./routes/jobTypeRoute.js";
import jobRouter from "./routes/jobRoute.js";

//?express config
const app = express();
const port = process.env.PORT || 5000;

//!error middleware
app.use(errorHandler);

//*middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", jobTypeRouter);
app.use("/api", jobRouter);

//todo start server
app.listen(port, () => {
  //database config
  DB_CONNECT();
  console.log(`Server is running on port: ${port}`);
});
