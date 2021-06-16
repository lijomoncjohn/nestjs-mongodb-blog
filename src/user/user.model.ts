import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'publisher'] },
});

export interface User extends mongoose.Document {
    id: string;
    name: string,
    email: string,
    role: string
}