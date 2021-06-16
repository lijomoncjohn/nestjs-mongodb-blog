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
        const blogs = await this.blogModel.find().exec();

        return blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            category: blog.category,
            publisher: blog.publisher
        }));
    }

    getBlogDetails(blogId: string) {
        const blog = this.blogs.find(blog => blog.id === blogId);

        if (!blog) {
            throw new NotFoundException('Could not find blog details');
        }

        return { ...blog }
    }

    updateBlog(blogId: string, title: string, description: string, category: string) {
        console.log();
    }

    removeBlog(blogId: string) {
        const index = this.findBlog(blogId)[1];
        this.blogs.splice(index, 1)
    }

    private findBlog(id: string): [Blog, number] {
        const blogIndex = this.blogs.findIndex(blog => blog.id === id);
        const blog = this.blogs[blogIndex]

        if (!blog) {
            throw new NotFoundException('Could not find blog details');
        }

        return [blog, blogIndex]
    }

}