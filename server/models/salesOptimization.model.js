const mongoose = require("mongoose");

const salesOptimizationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },

  /* ----------  Sales Estimator  ---------- */
  product:           { type: String,  required: true },
  avgPrice:          { type: Number,  required: true },
  expectedCustomers: { type: Number,  required: true },
  sellingMonths:     { type: Number,  default: 12 },
  estimatedYearlySales: { type: Number },

  /* ----------  Marketing Estimator  ---------- */
  monthlyBudget:       { type: Number, required: true },
  costPerClick:        { type: Number, default: 0.5 },
  conversionRate:      { type: Number, default: 0.02 },
  estimatedReach:      { type: Number },
  estimatedNewCustomers:{ type: Number }
});

salesOptimizationSchema.pre("save", function (next) {
  this.estimatedYearlySales =
    this.avgPrice * this.expectedCustomers * this.sellingMonths;

  this.estimatedReach        = this.monthlyBudget / this.costPerClick;
  this.estimatedNewCustomers = this.estimatedReach * this.conversionRate;
  next();
});

module.exports = mongoose.model("SalesOptimization", salesOptimizationSchema);
