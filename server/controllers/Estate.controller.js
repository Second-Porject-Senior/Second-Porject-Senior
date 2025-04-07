const {Estate}= require('../database/index');
const { get } = require('../routes/Estate.routes');


module.exports={
    getAllEstate: async (req, res) => {
        try {
          const estates = await Estate.findAll()
          res.json(estates);
        } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ message: 'Error fetching estates', error: error.message });
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
    },
    updateEstate: async (req,res)=>{
        try {
            const {id}= req.params
            const estate= await Estate.findOne({ where:{id}})
            if(!estate){
                return res.status(404).json({message: 'Estate not found'})
            }
            await estate.update(req.body)
            res.json(estate)

        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({message: 'Error updating estate',error: error.message,});
            
        }
    },
    deleteEstate: async (req,res)=>{
        try {
            const {id}= req.params
            const estate= await Estate.findOne({ where:{id}})
            if(!estate){
                return res.status(404).json({message: 'Estate not found'})
            }
            await estate.destroy()
            res.json({message: 'Estate deleted successfully'})

        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({message: 'Error deleting estate',error: error.message,});
            
        }
    },
    createEstate: async (req,res)=>{
        try {
            const estate= await Estate.create(req.body)
            res.status(201).json(estate)

        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({message: 'Error creating estate',error: error.message,});
            
        }
    },
}
