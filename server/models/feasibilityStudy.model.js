const mongoose = require("mongoose");

const feasibilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monthlyRevenue: { type: Number, required: true },
  monthlyCosts: { type: Number, required: true },
  startupCosts: { type: Number, required: true },
  monthlyProfit: { type: Number },
  breakEvenMonths: { type: Number },
  outcome: { type: String, enum: ["Looks profitable", "Needs review", "Not feasible"] },
  createdAt: { type: Date, default: Date.now }
});

feasibilitySchema.pre("save", function (next) {
  this.monthlyProfit = this.monthlyRevenue - this.monthlyCosts;
  this.breakEvenMonths =
    this.monthlyProfit > 0 ? this.startupCosts / this.monthlyProfit : null;

  if (this.monthlyProfit <= 0) {
    this.outcome = "Not feasible";
  } else if (this.breakEvenMonths < 12) {
    this.outcome = "Looks profitable";
  } else {
    this.outcome = "Needs review";
  }
  next();
});

const Feasibility = mongoose.model("FeasibilityStudy", feasibilitySchema);

module.exports = Feasibility;
