import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		const jwt = await this.authService.login(loginDto);
		return jwt;
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.authService.remove(+id);
	// }
}
