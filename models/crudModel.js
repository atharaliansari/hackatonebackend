const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
});


const crudModel = mongoose.model("crud", TodoSchema);

module.exports = crudModel;