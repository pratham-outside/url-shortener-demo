import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { env } from 'src/config/env';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userModel: Repository<User>,
	) {}
	async create(createUserDto: CreateUserDto) {
		try {
			const passwordHash = await bcrypt.hash(createUserDto.password, env.SALT_ROUND);
			const user = { ...createUserDto, password_hash: passwordHash };
			const isCreated = await this.userModel.insert(user);
			if (isCreated) {
				return {
					status: HttpStatus.CREATED,
					message: 'User created successfully',
				};
			}
		} catch (error) {
			if (error instanceof QueryFailedError) {
				console.log(error.query, error.parameters, error.driverError);
				throw new QueryFailedError(error.query, error.parameters, error.driverError);
			} else {
				throw new Error(error);
			}
		}
	}

	async findAll() {
		const users = await this.userModel.find({
			select: {
				id: true,
				email: true,
				name: true,
				is_verified: true,
			},
		});
		if (users.length == 0) {
			return {
				message: 'No users found !',
			};
		}
		return users;
	}

	async findById(id: number) {
		const user = await this.userModel.find({
			select: {
				id: true,
				email: true,
				name: true,
				is_verified: true,
			},
			where: {
				id: id,
			},
		});
		if (user.length == 0) {
			return {
				message: 'No data found for given id !',
			};
		}
		return user;
	}

	async findByEmail(email: string) {
		return await this.userModel.findOneBy({ email });
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return await this.userModel.update(id, updateUserDto);
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
