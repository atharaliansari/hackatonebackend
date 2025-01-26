const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Construction Loan Model
const constructionLoanSchema = new mongoose.Schema({
    landCost: { type: Number, required: true },
    materialCost: { type: Number, required: true },
    laborCost: { type: Number, required: true },
    machineryCost: { type: Number, required: true },
    maximumLoan: { type: Number, default: 1000000 }, // PKR 10 Lakh
    loanPeriod: { type: Number, default: 5 }, // 5 years
    submittedAt: { type: Date, default: Date.now },
});

const ConstructionLoan = mongoose.model('ConstructionLoan', constructionLoanSchema);

// POST route for submitting construction loan
router.post('/submit-construction-loan', async (req, res) => {
    const { landCost, materialCost, laborCost, machineryCost } = req.body;

    if (!landCost || !materialCost || !laborCost || !machineryCost) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newLoan = new ConstructionLoan({
            landCost,
            materialCost,
            laborCost,
            machineryCost,
        });

        // Save the loan to the database
        await newLoan.save();
        res.status(200).json({ message: 'Construction loan submitted successfully!', loan: newLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit loan. Please try again later.' });
    }
});

module.exports = router;
