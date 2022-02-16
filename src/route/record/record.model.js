import { Schema, model } from 'mongoose';

export const recordSchema = Schema({
    key: { type: String },
    value: { type: String },
    createdAt: { type: Date },
    counts: { type: [Number] },
});

export default model('record', recordSchema);
