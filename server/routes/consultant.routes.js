const express = require('express'); 
const { addConsultant, getAllConsultants, getConsultantById, updateConsultant, deleteConsultant, getConsultantTest } = require('../controllers/consultant.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken);

router.get('/test_consultant', getConsultantTest);

router.post('/addconsultant', addConsultant);

router.get('/getall', getAllConsultants);

router.get('/get/:id', getConsultantById);

router.put('/update/:id', updateConsultant);

router.delete('/delete/:id', deleteConsultant);

module.exports = router;