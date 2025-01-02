import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}
	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new Error('no user');
		}
		const isPasswordValid = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordValid) {
			throw new UnauthorizedException('ivalid');
		}

		const { name, is_verified } = user;
		const payload = {
			email,
			name,
			is_verified,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
