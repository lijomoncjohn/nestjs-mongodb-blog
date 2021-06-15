import { Injectable } from "@nestjs/common";

import { Category } from './category.model'

@Injectable()
export class CategoryService {
    categories: Category[] = [];

    insertCategory(name: string) {
        const categoryId = Math.random().toString();
        const newCategory = new Category(categoryId, name);
        this.categories.push(newCategory);
        return categoryId;
    }

    getCategories() {
        return [...this.categories];
    }
}