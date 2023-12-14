import mongoose from "mongoose";

export interface CreditDocument extends Document {
    userId: string;
    amount: number;
    createdAt: Date;
}

const CreditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Credit = mongoose.model<CreditDocument>("Credit", CreditSchema);
