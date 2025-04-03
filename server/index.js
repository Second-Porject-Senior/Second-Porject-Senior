const express = require("express");
require ("dotenv").config({ path: "./utils/.env" });
const bodyParser = require('body-parser');
const App = express();
const port = process.env.SERVER_PORT || 5000;
const db = require("./database/index.js");
const cors = require("cors");
require("dotenv").config();






App.use(bodyParser.json());
App.use(express.json());
App.use(cors());









App.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});