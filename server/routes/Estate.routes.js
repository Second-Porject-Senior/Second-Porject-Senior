const express = require("express")
const EstateRouter = express.Router()
const {getAllEstate} = require("../controllers/Estate.controller")

EstateRouter.get("/getall",getAllEstate)


module.exports = EstateRouter 