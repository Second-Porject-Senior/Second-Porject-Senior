const express = require("express");
require ("dotenv").config({ path: "./utils/.env" });
const cookieParser = require('cookie-parser');

const App = express();
const port = process.env.SERVER_PORT || 3000;
const db = require("./database/index.js");
const cors = require("cors");

const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const categoryRoutes = require("./routes/Category.routes.js");

App.use(express.json());
App.use(cookieParser());
App.use(cors())

App.use("/api/users", userRoutes);
App.use("/api/auth", authRoutes);
App.use("/api/category", categoryRoutes);

App.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});