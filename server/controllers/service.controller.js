const { default: mongoose } = require('mongoose');
const Application = require('../models/application.model'); 
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const Consultant = require('../models/consultant.model');  
const FinancialPlanning = require('../models/financialPlanning.model');
const Business = require('../models/business.model'); 
const { generateChart } = require('../services/generateGraph.service');

const addServiceApplication = async (req, res) => {  
    try {  
        const { applicantId, serviceId, status, paymentStatus } = req.body;

        if(!applicantId || !serviceId || !status ){
            throw new Error("All fields are required!");
        }  
        
        const applicationExist = await Application.findOne({ applicantId: applicantId, serviceId: serviceId });

        if (applicationExist) {
            return res.status(400).json({success: false, message: "Application already exists" });}  

        const newApplication = await Application.create({
            applicantId,
            serviceId, 
            status, 
            paymentStatus
        });

        const result = await newApplication.save();

        if (!result || !result._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new application' });
        }

        return res.status(201).json({ success: true, applicationId: result._id });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 
////////////////////////////////////////////////////////
const locationMarkrtAnalysis = async (req, res) => {
    res.send("marketingStrategyService applied");
};

const salesRevenueOptimization  = async (req, res) => {
    res.send("marketAnalysisService applied");
};
////////////////////////////////////////////////////////
 
const financialPlanningService = async (req, res) => {
    try {  
      const {
        applicantId, 
        applicationId,
        monthlyRevenue, 
        monthlyCosts, 
        startupCost 
      } = req.body; 
      
      if(!applicationId || !applicantId || !monthlyRevenue || !monthlyCosts || !startupCost ){
          throw new Error("All fields are required!");
      } 

      const application = await Application.findOne({ _id: applicationId, applicantId });
      if (!application) {
        return res.status(400).json({ success: false, message: 'Application not found for this applicant.' });
      }
      
      const business = await Business.findById(businessId).populate('categoryId');
      if (!business) {
        return res.status(404).json({ success: false, message: 'Business not found.' });
      }
      
      const location = await Location.findById(locationId).populate('businesses.categoryId');
      if (!location) {
        return res.status(404).json({ success: false, message: 'Location not found.' });
      }
      
      const netProfit = monthlyRevenue - monthlyCosts;
      const breakEvenMonths = netProfit > 0 ? Math.ceil(startupCost / netProfit) : null;
      const roi6Months = (netProfit * 6) - startupCost;
      
      const financialHealthIndex = netProfit > 0
        ? breakEvenMonths <= 6
          ? 'Healthy'
          : 'Break-even'
        : 'At Risk';
      
      const categoryBusiness = location.businesses.find(
        b => b.categoryId.toString() === business.categoryId._id.toString()
      );
      const totalBusinesses = location.businesses.reduce((sum, b) => sum + b.count, 0);
      const locationMarketScore = categoryBusiness
        ? Math.round((categoryBusiness.count / totalBusinesses) * 100)
        : 0;
      
      let competitiveInsight = '';
      let suggestedStrategy = '';
      
      if (locationMarketScore > 70) {
        competitiveInsight = 'Highly competitive area';
        suggestedStrategy = 'Differentiate via pricing, service, or niche';
      } else if (locationMarketScore > 30) {
        competitiveInsight = 'Moderate competition';
        suggestedStrategy = 'Leverage marketing, improve retention';
      } else {
        competitiveInsight = 'Low competition';
        suggestedStrategy = 'Capitalize on first-mover advantage';
      }
       
      const chartImage = await generateChart({
        labels: ['Startup Cost', 'Monthly Costs', 'Monthly Revenue', '6-Month ROI'],
        data: [startupCost, monthlyCosts, monthlyRevenue, roi6Months],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        title: 'Business Financial Summary'
      });
      
      const financialPlan = await FinancialPlanning.create({
        applicantId,
        businessId,
        locationId,
        applicationId,
        monthlyRevenue,
        monthlyCosts,
        startupCost,
        netProfit,
        breakEvenMonths,
        roi6Months,
        financialHealthIndex,
        locationMarketScore,
        competitiveInsight,
        suggestedStrategy,
        chartImage,
        chartImageType: 'image/png'
      });
      
      application.status = 'Approved';
      await application.save();
      
      return res.status(201).json({
        success: true,
        financialPlanningId: financialPlan._id
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 
 
const financialPlanningFreeTrialService  = async (req, res) => { 
     try {  
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId});
        console.log(serviceExist)
        if (!serviceExist) {
          return res.status(404).json({ success: false, message: "No service was found" });
        }  
        
        return res.status(200).json({ success: true, 
            data :{
                breakEvenMonths: serviceExist.breakEvenMonths,
                financialHealthIndex: serviceExist.financialHealthIndex, 
                graphImage: `data:${serviceExist.chartImageType};base64,${serviceExist.chartImage.toString('base64')}`
            }
         });
    
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
};
 
const financialPlanningPremiumService  = async (req, res) => { 
    try {  
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const application = await Application.findOne({ _id: applicationId, applicantId: applicantId });

        console.log(application)
        if (!application || !application.paymentStatus) { 
            return res.status(400).json({success: false, message: "User has not completed payment for the service."});
        }     
        const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId}); 
     
        if (!serviceExist) {
          return res.status(404).json({ success: false, message: "No service was found" });
        }  
        
        return res.status(200).json({ success: true, 
            data :{
                ...serviceExist
            }
         });
    
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
};
 
const consultancyService  = async (req, res) => {
    try {  
        const { 
            consultantId,
            applicantId, 
            serviceId,  
            applicationId,
            businessOverview ,  
            industryAnalysis,
            competitorInsights,
            locationRecommendation,
            targetAudienceDefinition,
            marketingSuggestions,
            operationsAdvice,
            legalConsiderations,
            growthStrategy,
            commonPitfalls,
            summaryRecommendation,  
            deliveryFormat
            } = req.body;

        if(!consultantId || !applicantId || !serviceId || !businessOverview || !industryAnalysis || !competitorInsights ||
             !locationRecommendation || !targetAudienceDefinition || !marketingSuggestions || !operationsAdvice || !legalConsiderations ||
             !growthStrategy || !commonPitfalls || !summaryRecommendation || !deliveryFormat || !applicationId
        ){
            throw new Error("All fields are required!");
        }    

        const application = await Application.findOne({_id: applicationId, applicantId: applicantId, serviceId: serviceId});
    
        if (!application) { 
            return res.status(400).json({success: false, message: "Application was not found "});
        }   

        const newConsultancyService = await Consultancy.create({
            consultantId ,
            applicantId ,
            serviceId ,  
            applicationId,
            businessOverview ,  
            industryAnalysis,
            competitorInsights,
            locationRecommendation,
            targetAudienceDefinition,
            marketingSuggestions,
            operationsAdvice,
            legalConsiderations,
            growthStrategy,
            commonPitfalls,
            summaryRecommendation,  
            deliveryFormat
        });  

        const consultancyServiceResult = await newConsultancyService.save();
 
        if (!consultancyServiceResult || !consultancyServiceResult._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new Service' });
        }
         
        application.status = 'Approved';
        await application.save();

        return res.status(201).json({ success: true, consultsncyId : consultancyServiceResult._id });

    } catch (error) {
        console.error('Error in addLocation:', error); 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 
 
const getApplicationStatus = async (req, res) => {
  
    try {
      const applicationid = req.params.id;
   
      if (!mongoose.isValidObjectId(applicationid)) {
        return res.status(400).json({ success: false, message: "Invalid application ID" });
      }
   
      const application = await Application.findById(applicationid); 

      if (!application) {  
        return res.status(404).json({ success: false, message: "No application was found" });
      }
  
      return res.status(200).json({ success: true, status: application.status });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
};
 
const getUserApplications = async (req, res) => {
  try {  
    const applicantId = req.params.applicantId;
   
    const applications = await Application.find({applicantId}); 

    if (!applications) {  
      return res.status(404).json({ success: false, message: "No application was found" });
    }

    return res.status(200).json({ success: true, applications });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
 
const getConsultantApplications = async (req, res) => {
  try {
    //if status is pending mean consultant can respond to application 
    const applications = await Application.find({status: "Pending"}).limit(10); 

    if (!applications) {  
      return res.status(404).json({ success: false, message: "No application was found" });
    } 

    return res.status(200).json({ success: true, data: applications });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
  
const getAllConsultants = async (req, res) => {
  try { 
    const consultants = await Consultant.find().populate('userId').limit(10); 

    if (!consultants) {  
      return res.status(404).json({ success: false, message: "No consultant was found" });
    } 

    return res.status(200).json({ success: true, data: consultants });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
  
const getAllServices = async (req, res) => {
  try { 
    const services = await Service.find(); 

    if (!services) {  
      return res.status(404).json({ success: false, message: "No service was found" });
    } 

    return res.status(200).json({ success: true, data: services });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
 
const updateApplication = async (req, res) => {
    try {     
        const { status, paymentStatus } = req.body;
    
        if(!status || !paymentStatus){
            throw new Error("All fields are required!");
        }

        const applicationid = req.params.id;

        const application = await Application.findOne({_id: applicationid });
            
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.status = status;

        application.paymentStatus = paymentStatus;
        
        await application.save();
 
        return res.status(200).json({ success: true, application});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};

const updatePaymentStatus = async (req, res) => {
    try {     
        const { paymentStatus } = req.body;
    
        if(!paymentStatus){
            throw new Error("All fields are required!");
        }

        const applicationid = req.params.id;

        const application = await Application.findById(applicationid);
        
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.paymentStatus = paymentStatus;

        await application.save();
 
        return res.status(200).json({ success: true, paymentStatus});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};

module.exports = { 
    locationMarkrtAnalysis, salesRevenueOptimization, financialPlanningService, financialPlanningFreeTrialService,
    financialPlanningPremiumService, consultancyService, getApplicationStatus, updateApplication, updatePaymentStatus, 
    addServiceApplication, getUserApplications, getConsultantApplications, getAllConsultants, getAllServices
}; 