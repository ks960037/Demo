import mongoose from "mongoose";

export interface RefreshTokenDocument extends Document {
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200,
        select: false
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200,
        select: false
    }
}, {
    timestamps: true,
    collection: "RefreshTokens"
});

export const RefreshToken = mongoose.model<RefreshTokenDocument>("", TokenSchema);
