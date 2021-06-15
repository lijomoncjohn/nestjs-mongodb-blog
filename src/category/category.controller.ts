import { Body, Controller, Post, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    addCategory(@Body('name') categoryName: string): any {
        const id = this.categoryService.insertCategory(categoryName);

        return { id: id }
    }

    @Get()
    getAllCategories() {
        return this.categoryService.getCategories();
    }
}