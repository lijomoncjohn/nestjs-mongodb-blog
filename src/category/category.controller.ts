import { Body, Controller, Post, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async addCategory(@Body('name') categoryName: string) {
        const generatedId = await this.categoryService.insertCategory(categoryName);
        console.log(generatedId);

        return { id: generatedId }
    }

    @Get()
    async getAllCategories() {
        const categories = await this.categoryService.getCategories();

        return categories;
    }
}