const mongoose = require('mongoose');

const apparelSchema = new mongoose.Schema({
  apparelType: { type: String, required: true },
  condition: { type: String, required: true },
  option: { type: String, required: true }, // disposal, donation, or recycling
  contactInfo: { type: String },
});

// Specify the collection name as 'bhar'
module.exports = mongoose.model('Apparel', apparelSchema, 'bhar');
