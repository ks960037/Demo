import mongoose from "mongoose";

export interface SMSRecordDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    type: string,
    number: string,
    content: string,
}

const SMSRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        default: "OTHER"
    },
    number: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    state: {
        type: Number,
        default: 1, // 0:成功 1:處理中 2:失敗
    },
    stateMessage: {
        type: String,
        default: "pending",
    },
}, {
    collection: "SMSRecords",
    timestamps: true,
});

export const SMSRecord = mongoose.model<SMSRecordDocument>("SMSRecord", SMSRecordSchema);
