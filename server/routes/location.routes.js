const express = require('express'); 
const { getAllLocation} = require('../controllers/location.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken);
   
router.get('/get', getAllLocation);
  
module.exports = router;