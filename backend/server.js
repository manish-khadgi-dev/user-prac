import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

import { ConnectDb } from "./src/config/dbConfig.js";
ConnectDb();

// routers
import UserRouters from "./src/routers/UserRouters.js";

app.use("/api/v1/user", UserRouters);

//uncaught error handler
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Page not found",
  };
  next(error);
});

//Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.errorCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
