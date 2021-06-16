import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Category } from './category.model'

@Injectable()
export class CategoryService {
    categories: Category[] = [];

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async insertCategory(name: string) {
        const newCategory = new this.categoryModel({
            name
        });

        const result = await newCategory.save();

        return result._id as string;

    }

    async getCategories() {
        const categories = await this.categoryModel.find().exec();

        return categories.map(cat => ({
            id: cat.id,
            name: cat.name
        }));
    }
}