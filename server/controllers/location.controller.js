const mongoose = require("mongoose");
const Location = require("../models/location.model");
const Category = require("../models/category.model"); // Ensure this exists

// Get best locations based on the categoryId
exports.getBestLocations = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Log the categoryId for debugging
    console.log("Received categoryId:", categoryId);

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ success: false, message: "Invalid categoryId" });
    }

    // Check if category exists
    const catExists = await Category.exists({ _id: categoryId });
    if (!catExists) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Define aggregation pipeline
    const pipeline = [
      { $unwind: "$businesses" },
      { 
        $match: { 
          "businesses.categoryId": new mongoose.Types.ObjectId(categoryId) 
        }
      },
      { $sort: { "businesses.count": 1 } },
      { 
        $group: { 
          _id: "$businesses.count", 
          locations: { $push: "$name" } 
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 1 }
    ];

    // Log the pipeline for debugging
    console.log("Aggregation Pipeline:", JSON.stringify(pipeline));

    const [result] = await Location.aggregate(pipeline);

    if (!result) {
      return res.status(200).json({
        success: true,
        message: "No competitors for this category in any stored location"
      });
    }

    res.json({
      success: true,
      data: {
        competitorCount: result._id,
        locations: result.locations
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
