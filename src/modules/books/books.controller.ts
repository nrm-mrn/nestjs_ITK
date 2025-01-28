import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Request,
	UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { JwtOptionalGuard } from 'src/core/guards/jwt-optional.guard';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	// Получить список всех книг
	@Get()
	async getAllBooks() {
		const result = this.booksService.getAllBooks()
		return result
	}

	// Получить книгу по ID
	@Get(':id')
	@UseGuards(JwtOptionalGuard)
	async getBookById(@Param('id') id: number, @Request() req: any) {
		const result = this.booksService.getBookById(id, req.user.userId)
		return result
	}

	// Создать новую книгу
	@Post()
	@HttpCode(201)
	@UseGuards(JwtAuthGuard)
	async createBook(@Body() bookDto: CreateBookDto, @Request() req: any) {
		const result = this.booksService.createBook(bookDto, req.user.userId)
		return result
	}

	// Обновить информацию о книге
	@Put(':id')
	@HttpCode(204)
	@UseGuards(JwtAuthGuard)
	async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto, @Request() req: any) {
		const result = await this.booksService.updateBook(bookDto, id, req.user.userId)
	}

	// Удалить книгу
	@Delete(':id')
	@HttpCode(204)
	@UseGuards(JwtAuthGuard)
	async deleteBook(@Param('id') id: number, @Request() req: any) {
		// необходимо вызвать соответствующий метод сервиса и вернуть результат
		//const result = await this.booksService.someMethod();
		await this.booksService.deleteBook(id, req.user.userId)
	}
}
