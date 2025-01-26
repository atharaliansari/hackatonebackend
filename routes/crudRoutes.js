const express = require('express');
const mongoose = require('mongoose'); // For ObjectId validation
const crudModel = require('../models/crudModel'); // crudModel import

const crudRoute = express.Router();

// POST Route - Add a Todo
crudRoute.post('/todo', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    try {
        const newTodo = new crudModel({ text });
        const result = await newTodo.save();

        res.status(201).json({
            isSuccessfully: true,
            data: result,
            message: 'Successfully added',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET Route - Fetch All Todos
crudRoute.get('/todo', async (req, res) => {
    try {
        const data = await crudModel.find();
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No todos found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Data successfully retrieved',
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET by ID - Fetch a Todo by ID
crudRoute.get('/todo/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    try {
        const todo = await crudModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Todo successfully retrieved',
            data: todo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// PUT Route - Update a Todo by ID
crudRoute.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    if (!text) {
        return res.status(400).json({ message: 'Text is required for update' });
    }

    try {
        const updatedTodo = await crudModel.findByIdAndUpdate(
            id,
            { text },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully updated',
            data: updatedTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// DELETE Route - Delete a Todo by ID
crudRoute.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    try {
        const deletedTodo = await crudModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully deleted',
            data: deletedTodo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = crudRoute;