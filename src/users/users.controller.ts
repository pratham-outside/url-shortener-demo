import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
// import { ValidationPipe } from 'src/pipe/validation.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('/api/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('/signup')
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@UseGuards(AuthGuard)
	@Get()
	async findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.usersService.findById(+id);
	}

	@Patch('/update/:id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
