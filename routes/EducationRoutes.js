const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Education Loan Model
const educationLoanSchema = new mongoose.Schema({
    universityFees: { type: Number, required: true },
    childFeesLoan: { type: Number, required: true },
    maximumLoan: { type: Number, default: 1000000 }, // PKR 10 Lakh
    loanPeriod: { type: Number, default: 5 }, // 5 years
    submittedAt: { type: Date, default: Date.now },
});

const EducationLoan = mongoose.model('EducationLoan', educationLoanSchema);

// POST route for submitting education loan
router.post('/submit-education-loan', async (req, res) => {
    const { universityFees, childFeesLoan } = req.body;

    if (!universityFees || !childFeesLoan) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newLoan = new EducationLoan({
            universityFees,
            childFeesLoan,
        });

        // Save the loan to the database
        await newLoan.save();
        res.status(200).json({ message: 'Education loan submitted successfully!', loan: newLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit loan. Please try again later.' });
    }
});

// GET route to fetch all education loans
router.get('/get-education-loans', async (req, res) => {
    try {
        const loans = await EducationLoan.find();
        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch loans. Please try again later.' });
    }
});

// GET route to fetch a specific education loan by ID
router.get('/get-education-loan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await EducationLoan.findById(id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch loan. Please try again later.' });
    }
});

// DELETE route to remove an education loan by ID
router.delete('/delete-education-loan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLoan = await EducationLoan.findByIdAndDelete(id);
        if (!deletedLoan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete loan. Please try again later.' });
    }
});

module.exports = router;
