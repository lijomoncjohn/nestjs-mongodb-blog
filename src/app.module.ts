import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CategoryModule, BlogModule, MongooseModule.forRoot('mongodb://localhost:27017/nestblogger')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
