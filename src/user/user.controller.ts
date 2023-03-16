import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dtos/user.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
      return await this.userService.findAll();
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: number) {
      return await this.userService.findOneById(id);
    }
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return await this.userService.create(createUserDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number) {
      return await this.userService.delete(id);
    }
  }