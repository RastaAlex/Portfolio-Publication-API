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
  
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: RequestWithUser) {
      const token = req.headers.authorization.split(' ')[1];
      await this.authService.logout(token);
      return {
        statusCode: 200,
        message: 'Logged out successfully',
      };
    }
  
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }
  }