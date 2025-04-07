const express = require("express")
const EstateRouter = express.Router()
const {getAllEstate, getEstateById, getEstatesByCategory } = require("../controllers/Estate.controller")

EstateRouter.get("/getall",getAllEstate)
EstateRouter.get("/get/:id",getEstateById)
EstateRouter.get("/getByCategory/:categoryId", getEstatesByCategory)


module.exports = EstateRouter 