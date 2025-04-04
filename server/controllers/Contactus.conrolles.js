const {contact}=require("../database/index.js")

module.exports = {
    getAllContact: async (req, res) => {
      try{
        const contact= await contact.findAll()
        res.json(contact)
      }catch(error){
    res.status(500).json(error)
    
        
      }
    }

  };