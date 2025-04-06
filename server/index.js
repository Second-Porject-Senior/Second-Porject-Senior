const express = require("express");
const morgan = require("morgan");
require ("dotenv").config({ path: "./utils/.env" });
require("./database/index.js");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");


const app = express();
 app.use(morgan("dev"));
const port = process.env.SERVER_PORT || 3000;
const cors = require("cors");

const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const categoryRoutes = require("./routes/Ctegory.routes.js");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

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