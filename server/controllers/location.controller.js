const Location = require("../models/location.model");  
   
const getAllLocation = async (req, res) => { 
    try {       
        const locations = await Location.find().populate('businesses.categoryId');
            
        if(locations.length === 0){
            return res.status(404).json({ success: false, message: "No location was found"}); 
        };  
    
        return res.status(200).json({ success: true, locations });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
}; 

module.exports = { getAllLocation };
 