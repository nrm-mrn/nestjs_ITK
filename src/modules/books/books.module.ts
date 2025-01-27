import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { BooksRepository } from './books.repository';
import { JwtStrategy } from 'src/core/guards/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Book]), UsersModule],
	controllers: [BooksController],
	providers: [BooksService, BooksRepository, JwtStrategy]
})
export class BooksModule { }
