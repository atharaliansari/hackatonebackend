const express = require('express');
const router = express.Router();
const WeddingLoan = require('../models/WeddingLoan'); // WeddingLoan Model ko import karna

// POST route for submitting wedding loan application
router.post('/submit-wedding-loan', async (req, res) => {
    const { weddingVenue, bridalDresses, catering, photography, valima, furniture, valimaFood, jahez } = req.body;

    // Validate inputs
    if (!weddingVenue || !bridalDresses || !catering || !photography || !valima || !furniture || !valimaFood || !jahez) {
        return res.status(400).json({ error: 'Sab fields ko fill karna zaroori hai.' });
    }

    try {
        const newLoan = new WeddingLoan({
            weddingVenue,
            bridalDresses,
            catering,
            photography,
            valima,
            furniture,
            valimaFood,
            jahez,
        });

        // Loan ko database mein save karna
        await newLoan.save();
        res.status(200).json({ message: 'Wedding loan successfully submit ho gaya hai!', loan: newLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Loan submit karte waqt kuch problem hui. Dobara koshish karein.' });
    }
});

// GET route to fetch all wedding loans
router.get('/get-wedding-loans', async (req, res) => {
    try {
        const loans = await WeddingLoan.find();
        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Loans ko fetch karte waqt kuch problem hui.' });
    }
});

// GET route to fetch a specific wedding loan by ID
router.get('/get-wedding-loan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await WeddingLoan.findById(id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan nahi mila.' });
        }
        res.status(200).json(loan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Loan fetch karte waqt kuch problem hui.' });
    }
});

// DELETE route to remove a wedding loan by ID
router.delete('/delete-wedding-loan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLoan = await WeddingLoan.findByIdAndDelete(id);
        if (!deletedLoan) {
            return res.status(404).json({ error: 'Loan nahi mila.' });
        }
        res.status(200).json({ message: 'Wedding loan successfully delete kar diya gaya.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Loan delete karte waqt kuch problem hui.' });
    }
});

module.exports = router;
