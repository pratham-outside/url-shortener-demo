import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'src/config/env';
import { ErrorHandler } from 'src/config/error-handling';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new Error();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: env.JWT_SECRET });
			console.log(payload);
			request['user'] = payload;
		} catch (error) {
			throw new TokenExpiredError(error.message, error.expiredAt);
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}