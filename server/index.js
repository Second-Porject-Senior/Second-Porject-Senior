const express = require("express");
const morgan = require("morgan");
require ("dotenv").config({ path: "./utils/.env" });
require("./database/index.js");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const cors = require("cors");

const app = express();
 app.use(morgan("dev"));
const port = process.env.SERVER_PORT || 3000;


const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const categoryRoutes = require("./routes/Category.routes.js");
const estateRoutes = require("./routes/Estate.routes.js");

App.use(express.json());
App.use(cookieParser());
App.use(cors({
  origin: 'http://localhost:5173', // your React app's URL
  credentials: true
}));

App.use("/api/users", userRoutes);
App.use("/api/auth", authRoutes);
App.use("/api/category", categoryRoutes);
App.use("/api/estate", estateRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});