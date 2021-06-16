import * as mongoose from 'mongoose'

export const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
})

export class Category {
    constructor(
        public id: string,
        public name: string
    ) { }
}