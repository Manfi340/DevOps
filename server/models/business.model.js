const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
  locationName: { type: String, enum :[ 
    'Wardiaan','Mahatet el raml', 'Ibrahmiya', 'Moharam bek', 
    'El mandara', 'El agami',  'Al mansheya', 'Smouha', 'Sedi beshr'
  ] ,required: true }, 
  createdAt: { type: Date, default: Date.now }
}); 

const Business =  mongoose.model('Business', businessSchema);

module.exports = Business ;
