const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  count: { type: Number, required: true }
}, { _id: false });

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businesses: [businessSchema]
}); 

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
