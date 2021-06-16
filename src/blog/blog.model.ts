import * as mongoose from 'mongoose'

export const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, ref: 'Category' },
    publisher: { type: String, required: true, },
});

export interface Blog extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    category: string,
    publisher: string
}