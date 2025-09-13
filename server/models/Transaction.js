import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["salary", "food", "vacation","entertainment", "utilities", "transportation", "health", "other"],
        required: true,
        default: "other"
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Transaction = new mongoose.model("transactions", transactionSchema)

export default Transaction