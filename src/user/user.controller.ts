import { Body, Controller, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('User')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async addUser(
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('role') userRole: string,
    ) {
        const generatedId = await this.userService.addUser(userName, userEmail, userRole);

        return { id: generatedId }
    }

    @Get()
    async getUsers() {
        const Users = await this.userService.getUsers();

        return Users;
    }

    @Get(':id')
    async getUserDetails(@Param('id') UserId: string) {
        const UserDetails = await this.userService.getUserDetails(UserId)
        return UserDetails;
    }

    @Put(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('name') userTitle: string,
        @Body('email') userDescription: string,
        @Body('role') userCategory: string
    ) {
        await this.userService.updateUser(userId, userTitle, userDescription, userCategory);

        return null
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.userService.removeUser(userId)

        return null
    }
}