const mongoose            = require("mongoose");
const SalesOptimization   = require("../models/salesOptimization.model");

exports.create = async (req, res) => {
  try {
    const { userId } = req.body;

    // quick validation
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const record = new SalesOptimization(req.body);
    await record.save();

    res.status(201).json({
      success: true,
      data: {
        estimatedYearlySales:  record.estimatedYearlySales,
        estimatedReach:        record.estimatedReach,
        estimatedNewCustomers: record.estimatedNewCustomers
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const list = await SalesOptimization.find().sort({ createdAt: -1 });

    // return only the calculated fields for each record
    const trimmed = list.map(doc => ({
      estimatedYearlySales:  doc.estimatedYearlySales,
      estimatedReach:        doc.estimatedReach,
      estimatedNewCustomers: doc.estimatedNewCustomers
    }));

    res.json({ success: true, data: trimmed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
