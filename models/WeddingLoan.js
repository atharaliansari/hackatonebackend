const mongoose = require('mongoose');

// Wedding Loan Model Schema
const weddingLoanSchema = new mongoose.Schema({
    weddingVenue: { type: Number, required: true }, // Shaadi ka venue ka kharcha
    bridalDresses: { type: Number, required: true }, // Bridal dress ka kharcha
    catering: { type: Number, required: true }, // Catering ka kharcha
    photography: { type: Number, required: true }, // Photography ka kharcha
    valima: { type: Number, required: true }, // Valima ka kharcha
    furniture: { type: Number, required: true }, // Furniture ka kharcha
    valimaFood: { type: Number, required: true }, // Valima food ka kharcha
    jahez: { type: Number, required: true }, // Jahez ka kharcha
    maximumLoan: { type: Number, default: 2000000 }, // Maximum loan limit, PKR 20 Lakh
    loanPeriod: { type: Number, default: 5 }, // Default loan period, 5 saal
    submittedAt: { type: Date, default: Date.now }, // Date jab loan submit kiya gaya tha
});

// WeddingLoan Model ko define karna
const WeddingLoan = mongoose.model('WeddingLoan', weddingLoanSchema);

module.exports = WeddingLoan;
