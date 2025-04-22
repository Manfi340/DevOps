const mongoose = require('mongoose');
 
const consultancySchema = new mongoose.Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },  
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },  
  businessOverview: { type: String, required: true }, // User's business description
  industryAnalysis: { type: String, required: true }, // Consultant's summary of market/sector
  competitorInsights: { type: String, required: true }, // Competitor evaluation & gaps
  locationRecommendation: { type: String, required: true }, // Suggested city/area
  targetAudienceDefinition: { type: String, required: true }, // Who the user should target
  marketingSuggestions: { type: String, required: true }, // Channels, branding, messaging
  operationsAdvice: { type: String, required: true }, // Staffing, process setup, logistics
  legalConsiderations: { type: String , required: true}, // Registration, license, permits
  growthStrategy: { type: String, required: true }, // Consultant’s plan to scale the businessS
  commonPitfalls: { type: String, required: true }, // What to avoid based on industry/context
  summaryRecommendation: { type: String, required: true }, // Final clear call-to-action or conclusion  
  deliveryFormat: { type: String, required: true }, //In-Person, Zoom, Phone Call, Google Meet  
  reportPublishedAt: { type: Date, default: Date.now}
}); 

const Consultancy = mongoose.model('Consultancy', consultancySchema);

module.exports = Consultancy;