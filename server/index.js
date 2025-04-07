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

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001", // your frontend's origin
  credentials: true, // allow cookies to be sent
}));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/estate", estateRoutes);

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