const express = require('express'); 
const { addBusiness, getAllBusinesses, getBusinessById, getAllCategories } = require('../controllers/business.controller');
const router = express.Router();  
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken);
    
router.post('/add', addBusiness);

router.get('/getall', getAllBusinesses);

router.get('/get/:id', getBusinessById); 

router.get('/categories', getAllCategories);

module.exports = router;