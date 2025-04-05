const {Estate}= require('../database/index');
const { get } = require('../routes/Estate.routes');


module.exports={
    getAllEstate: async (req, res) => {
        try{
            const estate= await Estate.findAll()
            res.json(estate)
        }catch(error){
            console.error('Database error:', error);
            res.status(500).json({message: 'Error fetching estates',error: error.message,});
        }
    },
    getEstateById: async (req,res)=>{
        try {
            const {id}= req.params
            const estate= await Estate.findOne({ where:{id}})
            if(!estate){
                return res.status(404).json({message: 'Estate not found'})
            }
            res.json(estate)

        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({message: 'Error fetching estate',error: error.message,});
            
        }
    }
}
