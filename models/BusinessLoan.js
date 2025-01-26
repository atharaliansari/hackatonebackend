const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your database URI)
mongoose.connect('mongodb://localhost:27017/loanDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Business Loan Model
const businessLoanSchema = new mongoose.Schema({
    buyStall: { type: Number, required: true },
    advanceRent: { type: Number, required: true },
    shopAssets: { type: Number, required: true },
    shopMachinery: { type: Number, required: true },
});

const BusinessLoan = mongoose.model('BusinessLoan', businessLoanSchema);

// POST route for submitting business loan
app.post('/submit-business-loan', async (req, res) => {
    const { buyStall, advanceRent, shopAssets, shopMachinery } = req.body;

    if (!buyStall || !advanceRent || !shopAssets || !shopMachinery) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newLoan = new BusinessLoan({
            buyStall,
            advanceRent,
            shopAssets,
            shopMachinery,
        });

        // Save the loan to the database
        await newLoan.save();
        res.status(200).json({ message: 'Business loan submitted successfully!', loan: newLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit loan. Please try again later.' });
    }
});


