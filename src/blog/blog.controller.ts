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
    async getBlogDetails(@Param('id') blogId: string) {
        const blogDetails = await this.blogService.getBlogDetails(blogId)
        return blogDetails;
    }

    @Put(':id')
    async updateBlog(
        @Param('id') blogId: string,
        @Body('title') blogTitle: string,
        @Body('description') blogDescription: string,
        @Body('category') blogCategory: string
    ) {
        await this.blogService.updateBlog(blogId, blogTitle, blogDescription, blogCategory);

        return null
    }

    @Delete(':id')
    async removeBlog(@Param('id') blogId: string) {
        await this.blogService.removeBlog(blogId)

        return null
    }
}