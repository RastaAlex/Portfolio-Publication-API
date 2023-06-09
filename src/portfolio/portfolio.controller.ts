import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dtos/portfolio.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('users/:userId/portfolios')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async findAll(@Param('userId') userId: number) {
    return this.portfolioService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('userId') userId: number, @Param('id') id: number) {
    return this.portfolioService.findOne(userId, id);
  }

  @Post()
  async create(
    @Param('userId') userId: number,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    return this.portfolioService.create(userId, createPortfolioDto);
  }

  @Delete(':portfolioId')
  async delete(
    @Param('userId') userId: number,
    @Param('portfolioId') portfolioId: number,
  ): Promise<void> {
    return this.portfolioService.delete(userId, portfolioId);
  }
}
