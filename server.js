const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

//load env vars
dotenv.config({
  path: "./config/config.env",
});
//connect to database
connectDB();

//Route file
const s3 = require("./routes/s3");

const app = express();

//Body Parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Set Security headers
app.use(helmet());

// Sanitize data
app.use(mongoSanitize()); // to prevent us from NO-SQL injection

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

//Mount Routers
app.use("/api", s3);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close Server and exit process
  server.close(() => process.exit(1));
});
