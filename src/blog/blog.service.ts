import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Blog } from './blog.model'

@Injectable()
export class BlogService {
    blogs: Blog[] = [];

    constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }


    async createBlog(title: string, description: string, category: string, publisher: string) {
        const newBlog = new this.blogModel({
            title,
            description,
            category,
            publisher
        });
        const result = await newBlog.save();

        return result._id as string;
    }

    async getBlogPosts() {
        const blogs = await this.blogModel.find().populate('category').populate('publisher');

        return blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            category: blog.category,
            publisher: blog.publisher
        }));
    }

    async getBlogDetails(blogId: string) {
        const blog = await this.blogModel.findById(blogId).populate('category').populate('publisher');

        if (!blog) {
            throw new NotFoundException('Could not find blog details');
        }

        return {
            id: blog.id,
            title: blog.title,
            description: blog.description,
            category: blog.category,
            publisher: blog.publisher,
        }
    }

    async updateBlog(blogId: string, title: string, description: string, category: string) {
        console.log(title, description);

        const updateBlog = await this.findBlog(blogId);

        if (title) {
            updateBlog.title = title
            console.log(updateBlog);
        }

        if (description) {
            updateBlog.description = title
        }
        if (category) {
            updateBlog.category = title
        }

        updateBlog.save();
    }

    async removeBlog(blogId: string) {
        const result = await this.blogModel.deleteOne({ _id: blogId }).exec()
        if (result.n === 0) {
            throw new NotFoundException('Could not find blog.');
        }
    }

    private async findBlog(id: string): Promise<Blog> {
        let blog;
        try {
            blog = await this.blogModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find blog.');
        }

        if (!blog) {
            throw new NotFoundException('Could not find blog details');
        }

        return blog;
    }

}