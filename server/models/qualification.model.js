const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});
 
const Qualification = mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;