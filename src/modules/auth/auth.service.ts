import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';


@Injectable()
export class AuthService {

	constructor(private usersRepository: UsersRepository,
		private jwtService: JwtService) { }

	async validateUser(email: string, password: string): Promise<{ userId: number }> {
		const user: User | null = await this.usersRepository.findByEmail(email)
		if (!user) {
			throw new UnauthorizedException('Wrong username or password')
		}

		const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
		if (isPasswordValid) {
			return { userId: user.id }
		} else {
			throw new UnauthorizedException('Wrong username or password')
		}
	}

	login(userId: string): { accessToken: string } {
		const accessToken: string = this.jwtService.sign({ userId })
		return { accessToken }
	}
}
