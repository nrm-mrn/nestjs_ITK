import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [UsersModule, PassportModule, JwtModule.register(
		{
			secret: 'secret_key',
			signOptions: { expiresIn: '60m' }
		}
	)],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
