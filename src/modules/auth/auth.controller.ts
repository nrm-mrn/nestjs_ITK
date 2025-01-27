import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('login')
	@UseGuards(LocalAuthGuard)
	login(@Request() req: any) {
		return this.authService.login(req.user.userId)

	}
}
