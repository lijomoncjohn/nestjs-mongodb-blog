import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CategoryModule, BlogModule, UserModule, MongooseModule.forRoot('mongodb://localhost:27017/nestblogger')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
