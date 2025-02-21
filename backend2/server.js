const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/ngo-platform';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// -------------------- Models --------------------

// 📌 Report Model
const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

// 📌 Volunteer Model
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// 📌 Donation Model
const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);

// -------------------- Routes --------------------

// 🌍 Test Route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// 📝 API to Submit a Report
app.post('/api/report', async (req, res) => {
  try {
    const { description, imageUrl, location } = req.body;
    const newReport = new Report({ description, imageUrl, location });
    await newReport.save();

    res.status(201).json({ message: '✅ Report submitted successfully!', report: newReport });
  } catch (err) {
    console.error('❌ Error submitting report:', err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// 👤 API to Register as a Volunteer
app.post('/api/volunteer', async (req, res) => {
  try {
    const { name, email, phone, skills } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, skills });
    await newVolunteer.save();

    res.status(201).json({ message: '✅ Volunteer registered successfully!', volunteer: newVolunteer });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: '❌ Email already registered!' });
    }
    console.error('❌ Error registering volunteer:', err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// 💰 API to Receive Donations
app.post('/api/donate', async (req, res) => {
  try {
    const { amount, donorName, donorEmail } = req.body;
    const newDonation = new Donation({ amount, donorName, donorEmail });
    await newDonation.save();

    res.status(201).json({ message: '✅ Donation received!', donation: newDonation });
  } catch (err) {
    console.error('❌ Error processing donation:', err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const startupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    founder: { type: String, required: true },
    fundingGoal: { type: Number, required: true },
    fundsRaised: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Startup = mongoose.model('Startup', startupSchema);

  app.post('/api/startup', async (req, res) => {
    try {
      const { name, description, founder, fundingGoal } = req.body;
  
      // Create a new startup
      const newStartup = new Startup({ name, description, founder, fundingGoal });
      await newStartup.save();
  
      res.status(201).json({ message: 'Startup listed successfully!', startup: newStartup });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  app.post('/api/invest', async (req, res) => {
    try {
      const { startupId, amount, investorName, investorEmail } = req.body;
  
      // Find the startup
      const startup = await Startup.findById(startupId);
      if (!startup) {
        return res.status(404).json({ error: 'Startup not found!' });
      }
  
      // Update funds raised
      startup.fundsRaised += amount;
      await startup.save();
  
      // Save investment details (you can integrate a payment gateway later)
      const investment = { startupId, amount, investorName, investorEmail };
      res.status(201).json({ message: 'Investment received!', investment });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });