const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Business Loan Model
const businessLoanSchema = new mongoose.Schema({
    buyStall: { type: Number, required: true },
    advanceRent: { type: Number, required: true },
    shopAssets: { type: Number, required: true },
    shopMachinery: { type: Number, required: true },
    maximumLoan: { type: Number, default: 1000000 }, // PKR 10 Lakh
    loanPeriod: { type: Number, default: 5 }, // 5 years
    submittedAt: { type: Date, default: Date.now },
});

const BusinessLoan = mongoose.model('BusinessLoan', businessLoanSchema);

// POST route for submitting business loan
router.post('/submit-business-loan', async (req, res) => {
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

module.exports = router;
