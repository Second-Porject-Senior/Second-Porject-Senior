const {Estate}= require('../database/index')


module.exports={
    getAllEstate: async (req, res) => {
        try{
            const estate= await Estate.findAll()
            res.json(estate)
        }catch(error){
            console.error('Database error:', error);
            res.status(500).json({message: 'Error fetching estates',error: error.message,});
        }
    }
}
