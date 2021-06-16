import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from './user.model'

@Injectable()
export class UserService {
    users: User[] = [];

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async addUser(name: string, email: string, role: string) {
        const newUser = new this.userModel({
            name, email, role
        })

        const result = await newUser.save();

        return result._id as string;
    }

    async getUsers() {
        const users = await this.userModel.find();

        return users.map(user => ({
            id: user.id,
            title: user.name,
            description: user.email,
            category: user.role,
        }));
    }

    async getUserDetails(userId: string) {
        const user = await this.findUser(userId);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }

    async updateUser(userId: string, name: string, email: string, role: string) {
        const updateUser = await this.findUser(userId);

        if (name) {
            updateUser.name = name
        }

        if (email) {
            updateUser.email = email
        }
        if (role) {
            updateUser.role = role
        }

        updateUser.save();
    }

    async removeUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec()
        if (result.n === 0) {
            throw new NotFoundException('Could not find user.');
        }
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user.');
        }

        if (!user) {
            throw new NotFoundException('Could not find user details');
        }

        return user;
    }
}