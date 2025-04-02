const express = require("express");
const bodyParser = require('body-parser');
const App = express();
const port = 3005;
const db = require("./database/index.js");
const cors = require("cors");
require("dotenv").config();






App.use(bodyParser.json());
App.use(express.json());
App.use(cors());









App.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});