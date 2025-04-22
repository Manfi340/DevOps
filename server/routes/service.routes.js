const express = require('express'); 
const { 
    locationMarkrtAnalysis, salesRevenueOptimization, financialPlanningService, financialPlanningFreeTrialService,
    financialPlanningPremiumService, consultancyService, getApplicationStatus, updateApplication, updatePaymentStatus, 
    addServiceApplication, getUserApplications, getConsultantApplications, getAllConsultants, getAllServices
} = require('../controllers/service.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 
 
router.use(VerifyToken); 

router.post('/add-service-application', addServiceApplication); 

router.post('/location-markrt-analysis', locationMarkrtAnalysis);

router.post('/sales-revenue-optimization', salesRevenueOptimization);

router.post('/financial-planning-service', financialPlanningService);

router.get('/financial-planning-free-trial-service/:applicantid/:applicationid', financialPlanningFreeTrialService);

router.get('/financial-planning-premium-service/:applicantid/:applicationid', financialPlanningPremiumService);

router.post('/consultancy', consultancyService);

router.get('/get-consultants', getAllConsultants);

router.get('/get-services', getAllServices); 

router.get('/user/:applicantId', getUserApplications);

router.get('/consultant', getConsultantApplications);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/update/:id', updateApplication);

router.put('/update/paymentstatus/:id', updatePaymentStatus);

module.exports = router;