const mongoose = require('mongoose');

const financialPlanningSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  monthlyRevenue: { type: Number, required: true },
  monthlyCosts: { type: Number, required: true },
  startupCost: { type: Number, required: true },
  netProfit: { type: Number },
  breakEvenMonths: { type: Number },
  roi6Months: { type: Number },
  financialHealthIndex: { type: String }, 
  locationMarketScore: { type: Number }, 
  competitiveInsight: { type: String },
  suggestedStrategy: { type: String },
  chartImage: { type: Buffer },
  chartImageType: { type: String },
  reportPublishedAt: { type: Date, default: Date.now }
});


const FinancialPlanning = mongoose.model('FinancialPlanning', financialPlanningSchema);
  
module.exports = FinancialPlanning;
