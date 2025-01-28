import {
	Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt') {

	handleRequest(err, user, info) {
		// You can throw an exception based on either "info" or "err" arguments
		if (!user) {
			return { userId: undefined }
		}
		return user;
	}
}
