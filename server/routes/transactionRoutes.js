import express from 'express';
const router = express.Router();
import Transaction from '../models/Transaction.js';


//Get all transactions for a user
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        if (!transactions) return res.status(404).json({ message: "No transactions found" });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Add a new transaction
router.post('/add', async (req, res) => {
    try {
        const userId = req.user._id;

        req.body.userId = userId; 

        const transaction = new Transaction(req.body);

        if (!transaction) return res.status(400).json({ message: "Invalid transaction data" });

        await transaction.save();
        res.status(201).json({ message: "Transaction added successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Update a transaction
router.put('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        res.status(200).json({ message: "Transaction updated successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;