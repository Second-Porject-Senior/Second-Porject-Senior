const {Category}=require("../database/index.js")

module.exports = {
    getAllcategory: async (req, res) => {
      try{
        const category= await Category.findAll()
        res.json(category)
      }catch(error){
   res.status(500).json(error)
   
      
       
      }
    }

  };



  