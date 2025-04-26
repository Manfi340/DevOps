const mongoose    = require("mongoose");
const Feasibility = require("../models/feasibilityStudy.model");

// ───────────── create ─────────────
exports.create = async (req, res) => {
  try {
    const { userId, monthlyRevenue, monthlyCosts, startupCosts } = req.body;


    if (!userId || !monthlyRevenue || !monthlyCosts || !startupCosts) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    
    const record = new Feasibility({
      userId,
      monthlyRevenue,
      monthlyCosts,
      startupCosts
    });
    await record.save();

    
    res.status(201).json({
      success: true,
      data: {
        _id:             record._id,
        monthlyProfit:   record.monthlyProfit,
        breakEvenMonths: record.breakEvenMonths,
        outcome:         record.outcome,
        
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getAll = async (_req, res) => {
  try {
    const list = await Feasibility.find().sort({ createdAt: -1 });

    const formatted = list.map(doc => ({
      _id:             doc._id,
      monthlyProfit:   doc.monthlyProfit,
      breakEvenMonths: doc.breakEvenMonths,
      outcome:         doc.outcome
      
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
