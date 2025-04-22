const mongoose = require('mongoose'); 

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  amount: { type: mongoose.Types.Decimal128, required: true }
});
 
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service ;
