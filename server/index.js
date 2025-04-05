const express = require("express");
require ("dotenv").config({ path: "./utils/.env" });
const cookieParser = require('cookie-parser');

const App = express();
const port = process.env.SERVER_PORT || 3000;
const db = require("./database/index.js");
const cors = require("cors");

const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const categoryRoutes = require("./routes/Ctegory.routes.js");
const contactRoutes = require("./routes/Contact.routes.js");

App.use(express.json());
App.use(cookieParser());
App.use(cors({
  origin: 'http://localhost:5173', // your React app's URL
  credentials: true
}));

App.use("/api/users", userRoutes);
App.use("/api/auth", authRoutes);
App.use("/api/category", categoryRoutes);
App.use("/api/contact", contactRoutes);

App.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});