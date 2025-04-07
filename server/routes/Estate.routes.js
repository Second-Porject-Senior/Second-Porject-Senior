const express = require("express")
const EstateRouter = express.Router()
const {getAllEstate, getEstateById , updateEstate,createEstate,deleteEstate,getEstatesByCategory} = require("../controllers/Estate.controller")

EstateRouter.get("/getall",getAllEstate)
EstateRouter.get("/get/:id",getEstateById)
EstateRouter.post("/create",createEstate)
EstateRouter.put("/update/:id",updateEstate)
EstateRouter.delete("/delete/:id",deleteEstate)
EstateRouter.get("/getByCategory/:categoryId", getEstatesByCategory)


module.exports = EstateRouter 