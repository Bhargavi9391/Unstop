const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Apparel Model
const apparelSchema = new mongoose.Schema({
  apparelType: { type: String, required: true },
  condition: { type: String, required: true },
  option: { type: String, required: true }, // disposal, donation, or recycling
  contactInfo: { type: String },
});

// Specify the collection name as 'bhar'
const Apparel = mongoose.model('Apparel', apparelSchema);

// Routes
app.post('/api/submit', async (req, res) => {
  try {
    const apparel = new Apparel(req.body);
    await apparel.save();
    res.status(201).json(apparel);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting apparel' });
  }
});

app.get('/api/entries', async (req, res) => {
  try {
    const apparelEntries = await Apparel.find();
    res.json(apparelEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
