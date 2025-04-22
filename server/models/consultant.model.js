const mongoose = require('mongoose'); 
const consultantSchema = new mongoose.Schema({
  salary: { type: mongoose.Types.Decimal128, required: true },
  bonus: { type: mongoose.Types.Decimal128, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  qualificationsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualification' }],
  experienceYears: { type: Number, default: 0 },
}); 
 
const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
