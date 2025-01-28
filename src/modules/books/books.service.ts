import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
	constructor(private readonly booksRepository: BooksRepository,
		private userRepository: UsersRepository) { }

	// Получить список всех книг
	async getAllBooks(): Promise<Book[]> {
		return this.booksRepository.findAll();
	}

	// Получить книгу по ID
	async getBookById(id: number, userId: number): Promise<Book> {
		const book: Book = await this.booksRepository.findOneOrNotFoundFail(id);
		if (!userId) {
			if (book.ageRestriction >= 18) {
				throw new UnauthorizedException('18+ books only for registered users')
			}
			return book
		}
		const user: User = await this.userRepository.findByIdOrNotFoundFail(userId)
		if (user.age < 18 && book.ageRestriction >= 18) {
			throw new ForbiddenException('Age is restricted')
		}
		return book
	}

	// Создать новую книгу
	async createBook(dto: CreateBookDto, userId: number): Promise<void> {
		const user: User = await this.userRepository.findByIdOrNotFoundFail(userId)

		const book: Book = Book.createBook(dto, userId, user.age)

		await this.booksRepository.save(book);
	}

	async updateBook(dto: UpdateBookDto, bookId: number, userId: number): Promise<void> {
		const book: Book = await this.booksRepository.findOneOrNotFoundFail(bookId)
		book.updateBook(dto, userId)
	}

	async deleteBook(bookId: number, userId: number): Promise<void> {
		const book: Book = await this.booksRepository.findOneOrNotFoundFail(bookId)
		if (book.ownerId !== userId) {
			throw new ForbiddenException('Only the owner can delete a book')
		}
		await this.booksRepository.remove(bookId)
	}
}
