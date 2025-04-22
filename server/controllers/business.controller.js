const Categories = require("../models/category.model");     

const addBusiness = async (req, res) => {
    res.send("Business registered successfully");
};

const getAllBusinesses = async (req, res) => {
    res.send("Fetched all businesses");
};

const getBusinessById = async (req, res) => {
    res.send(`Business details for ID ${req.params.id}`);
};

const getAllCategories = async (req, res) => {
    try {        
        const categories = await Categories.find();
            
        if(!categories){
            return res.status(404).json({ success: false, message: "No category was found"}); 
        };  
    
        return res.status(200).json({ success: true, categories });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};


module.exports = { addBusiness, getAllBusinesses, getBusinessById, getAllCategories };
 