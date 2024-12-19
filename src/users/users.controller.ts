import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { STATUS_CODES } from 'http';
import { TypeORMError } from 'typeorm';
import { Response } from 'express';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log('initialized');
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // return await this.usersService.create(createUserDto);
    try {
      const isCreated = await this.usersService.create(createUserDto);
      if (isCreated) {
        return {
          status: HttpStatus.CREATED,
          data: isCreated,
        };
      }
    } catch (error) {
      console.log(error.name);
      throw new TypeORMError(error);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const userData = await this.usersService.findOne(+id);
    if (userData) {
      return userData;
    } else {
      response.json({
        message: 'No data found for given id !',
      });
    }
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const userUpdated = await this.usersService.update(+id, updateUserDto);
    if (userUpdated.affected != 0) {
      response.json(userUpdated).send();
    } else {
      response.json({
        message: 'No data found for given id !',
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
