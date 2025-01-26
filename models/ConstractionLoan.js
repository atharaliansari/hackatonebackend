const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your database URI)
mongoose.connect('mongodb://localhost:27017/loanDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Construction Loan Model
const constructionLoanSchema = new mongoose.Schema({
    structure: { type: Number, required: true },
    finishing: { type: Number, required: true },
    loan: { type: Number, required: true },
    maximumLoan: { type: Number, default: 1000000 }, // PKR 10 Lakh
    loanPeriod: { type: Number, default: 5 }, // 5 years
    submittedAt: { type: Date, default: Date.now },
});

const ConstructionLoan = mongoose.model('ConstructionLoan', constructionLoanSchema);

// POST route for submitting construction loan
app.post('/submit-construction-loan', async (req, res) => {
    const { structure, finishing, loan } = req.body;

    if (!structure || !finishing || !loan) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newLoan = new ConstructionLoan({
            structure,
            finishing,
            loan,
        });

        // Save the loan to the database
        await newLoan.save();
        res.status(200).json({ message: 'Construction loan submitted successfully!', loan: newLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit loan. Please try again later.' });
    }
});

