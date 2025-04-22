const mongoose = require('mongoose');  

const applicationServiceSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, 
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, 
  paymentStatus: { type: Boolean, default: false},
  appliedAt: { type: Date, default: Date.now }
});

const Application =  mongoose.model('Application Service', applicationServiceSchema);

module.exports = Application;
