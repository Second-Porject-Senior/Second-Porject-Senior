const express = require("express")
const EstateRouter = express.Router()
const {getAllEstate, getEstateById } = require("../controllers/Estate.controller")

EstateRouter.get("/getall",getAllEstate)
EstateRouter.get("/get/:id",getEstateById)


module.exports = EstateRouter 