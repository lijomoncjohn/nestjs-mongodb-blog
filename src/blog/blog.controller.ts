import { Body, Controller, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    async addBlog(
        @Body('title') blogTitle: string,
        @Body('description') blogDescription: string,
        @Body('category') blogCategory: string,
        @Body('publisher') blogPublisher: string,
    ) {
        const generatedId = await this.blogService.createBlog(blogTitle, blogDescription, blogCategory, blogPublisher);

        return { id: generatedId }
    }

    @Get()
    async getAllBlogPosts() {
        const blogs = await this.blogService.getBlogPosts();

        return blogs;
    }

    @Get(':id')
    getBlogDetails(@Param('id') blogId: string) {
        return this.blogService.getBlogDetails(blogId)
    }

    @Put(':id')
    updateBlog(
        @Param('id') blogId: string,
        @Param('title') blogTitle: string,
        @Param('description') blogDescription: string,
        @Param('category') blogCategory: string
    ) {
        this.blogService.updateBlog(blogId, blogTitle, blogDescription, blogCategory);

        return null
    }

    @Delete(':id')
    removeBlog(@Param('id') blogId: string) {
        this.blogService.removeBlog(blogId)

        return null
    }
}