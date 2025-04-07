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
    },
    getEstatesByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            console.log('Fetching estates for category ID:', categoryId);
            
            const estates = await Estate.findAll({
                where: { category_id: categoryId }
            });
            
            console.log(`Found ${estates.length} estates for category ID ${categoryId}`);
            res.json(estates);
        } catch (error) {
            console.error('Error fetching estates by category:', error);
            res.status(500).json({
                message: 'Error fetching estates by category',
                error: error.message
            });
        }
    }
}
