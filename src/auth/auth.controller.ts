import {
    Controller,
    Post,
    Req,
    UseGuards,
    Body,
    HttpCode,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { CreateUserDto } from '../user/dtos/user.dto';
  import { RequestWithUser } from './interfaces/request-with-user.interface';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: RequestWithUser) {
      return this.authService.login(req.user);
    }
  
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: RequestWithUser) {
      // Implement any necessary logout logic, e.g., revoking refresh tokens
    }
  
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }
  }